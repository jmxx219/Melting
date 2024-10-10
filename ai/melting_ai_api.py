import os
import shutil
import sys
now_dir = os.getcwd()
sys.path.append(now_dir)
from fastapi import FastAPI, File, UploadFile, HTTPException, Request, Path, Query, Body, Form
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydub import AudioSegment
import io
import boto3
import webbrowser
import infer_init as ai
import uuid
import json
import logging
import redis
import tempfile
import asyncio
import redis.asyncio as aioredis
import soundfile as sf
import numpy as np
import librosa
from enum import Enum
from typing import List, Tuple
from dotenv import load_dotenv
from botocore.exceptions import ClientError
from urllib.parse import urlparse
from urllib.request import urlopen
from urllib.error import URLError
from boto3 import client
from datetime import datetime
from pydantic import BaseModel
from fastapi import BackgroundTasks

load_dotenv() #.env 파일로드

BASE_DIR = "input"
TEMP_DIR = "TEMP"

INPUT_DIR = os.path.join(BASE_DIR, "origin")
VOICE_DIR = os.path.join(BASE_DIR, "voice")
INSTRUMENT_DIR = os.path.join(BASE_DIR, "instrument")
NON_ECHO_DIR = os.path.join(BASE_DIR, "non_echo")
ONLY_ECHO_DIR = os.path.join(BASE_DIR, "only_echo")
TARGET_VOICE_DIR = os.path.join(BASE_DIR, "target_voice")
USER_TRAINING_DATA_BASE_DIR = os.path.join(BASE_DIR, "training_data")
CLEAN_VOICE_TEMP_DIR = os.path.join(TEMP_DIR, "clean_voice")
AI_COVER_VOICE_DIR = os.path.join(BASE_DIR, "aicover_voice")
AI_COVER_SONG_DIR = os.path.join(BASE_DIR, "aicover_song")

# AWS setup
aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
aws_region = os.getenv('AWS_REGION')
s3_bucket_name = os.getenv('S3_BUCKET_NAME')
cloudfront_domain = os.getenv('CLOUDFRONT_DOMAIN')

redis_host = os.getenv('REDIS_HOST')
redis_password = os.getenv('REDIS_PASSWORD')


os.makedirs(BASE_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(INPUT_DIR, exist_ok=True)
os.makedirs(VOICE_DIR, exist_ok=True)
os.makedirs(INSTRUMENT_DIR, exist_ok=True)
os.makedirs(NON_ECHO_DIR, exist_ok=True)
os.makedirs(ONLY_ECHO_DIR, exist_ok=True)
os.makedirs(TARGET_VOICE_DIR, exist_ok=True)
os.makedirs(USER_TRAINING_DATA_BASE_DIR, exist_ok=True)
os.makedirs(CLEAN_VOICE_TEMP_DIR, exist_ok=True)
os.makedirs(AI_COVER_VOICE_DIR, exist_ok=True)
os.makedirs(AI_COVER_SONG_DIR, exist_ok=True)

UNIT_EPOCH_PER_VOICE = 1

app = FastAPI()
r = redis.Redis(host =redis_host, port=6379, password=redis_password, db=0)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

class Gender(Enum):
    MALE = "MALE"
    FEMALE = "FEMALE"

class InferenceRequest(BaseModel):
    songId: str
    originalSongMrUrl: str
    originalSongVoiceUrl: str
    memberGender: Gender
    originalVoiceGender: Gender


class MeltingRedisPubDto(BaseModel):
    userVoiceUrl: str
    singerVoiceUrl: str
    mrUrl: str
    memberId: str
    songId: str
    endpoint: bool

class AiCoverRequest(BaseModel):
    memberId: int
    songId: int
    originalSongMrUrl: str
    originalSongVoiceUrl: str
    memberGender: str
    originalVoiceGender: str


directories_to_clean = [
    os.path.join(TEMP_DIR, "TEMP"),
    os.path.join(BASE_DIR, "instrument"),
    os.path.join(BASE_DIR, "non_echo"),
    os.path.join(BASE_DIR, "only_echo"),
    os.path.join(BASE_DIR, "origin"),
    os.path.join(BASE_DIR, "voice")
]

directories_to_clean_after_AI = [
    os.path.join(BASE_DIR, "aicover_song"),
    os.path.join(BASE_DIR, "aicover_voice"),
    os.path.join(BASE_DIR, "target_voice")
]



# S3 client setup
s3_client = boto3.client(
    's3',
    aws_access_key_id = aws_access_key_id,
    aws_secret_access_key = aws_secret_access_key,
    region_name = aws_region
)

#------------------------- REDIS -------------------------


async def create_redis_pool():
    return await aioredis.from_url(f"redis://{redis_host}", password=redis_password)

@app.on_event("startup")
async def startup_event():
    app.state.redis = await create_redis_pool()
    asyncio.create_task(redis_subscriber())

@app.on_event("shutdown")
async def shutdown_event():
    await app.state.redis.close()

async def redis_subscriber():
    redis = await create_redis_pool()
    pubsub = redis.pubsub()
    await pubsub.subscribe("melting_song_channel", "ai_cover_song_channel")

    logging.info("Subscribed to melting_song_channel and ai_cover_song_channel")

    while True:
        try:
            message = await pubsub.get_message(ignore_subscribe_messages=True)
            if message:
                channel = message['channel'].decode()
                data = json.loads(message['data'])
                
                logging.info(f"Received message from channel: {channel}")
                logging.info(f"Message data: {json.dumps(data, indent=2)}")
                
                if channel == "melting_song_channel":
                    melting_data = MeltingRedisPubDto.parse_obj(data)
                    logging.info(f"Processing melting data: {melting_data}")
                    await process_melting(melting_data)
                elif channel == "ai_cover_song_channel":
                    ai_cover_data = AiCoverRequest.parse_obj(data)
                    logging.info(f"Processing AI cover data: {ai_cover_data}")
                    await process_ai_cover(ai_cover_data)
                else:
                    logging.warning(f"Received message from unknown channel: {channel}")
        except json.JSONDecodeError as json_err:
            logging.error(f"JSON decoding error: {json_err}")
            logging.error(f"Raw message data: {message['data']}")
        except Exception as e:
            logging.exception(f"Error processing Redis message: {str(e)}")
    


#------------------------- FAST_API -------------------------
# TODO : basic토큰 인증처리 필요

# @app.post("/api/rvc-ai/melting")
# async def melting(voice_file: UploadFile, member_id: str, song_id: str, original_song_mr_url: str):
#     """
#     노이즈 제거 -> merge(멜팅 곡 생성) -> 모델 학습
#     """

#     # --------------------노이즈 제거
#     file_path = await save_file_and_get_path(INPUT_DIR, voice_file)
#     voice_file_path = await call_ai_uvr(file_path, mode="instrument")
#     non_echo_file_path = await call_ai_uvr(voice_file_path, mode="echo")

#     os.makedirs(TEMP_DIR, exist_ok=True)
#     result_file_name = f"{member_id}_clean_voice_file.mp3"
#     # 노이즈 제거 파일 경로
#     result_file_path = os.path.join(TEMP_DIR, result_file_name)

#     shutil.copy2(non_echo_file_path, result_file_path)

#     # --------------------멜팅곡 생성
#     temp_instrument_path = "TEMP/temp_instrument.mp3"
#     download_file_from_cloudfront(original_song_mr_url,temp_instrument_path)

#     # 오디오 파일 병합
#     voice = AudioSegment.from_file(result_file_path)
#     instrument = AudioSegment.from_file(temp_instrument_path)
#     merged_audio = instrument.overlay(voice)

#     # 병합된 오디오 저장
#     temp_merged_path = "TEMP/merged_result.mp3"
#     merged_audio.export(temp_merged_path)


#     # 결과 파일명 생성
#     timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
#     output_filename = f"song_{song_id}_{timestamp}.mp3"

#     # 결과 파일 S3에 업로드
#     s3_output_path = f"audio/generated_song/{output_filename}"
#     cloudfront_url = upload_file_to_cloudfront(temp_merged_path, s3_output_path)


#     # --------------------모델 학습
#     await add_train_data(member_id)

#     await train(member_id)


#     # 임시 파일 삭제
#     for temp_file in [result_file_name, temp_instrument_path, temp_merged_path]:
#         delete_local_file(temp_file)

async def process_melting(melting_data):
    try:
        # 사용자 음성 파일 다운로드
        temp_voice_path = "TEMP/temp_voice.mp3"
        download_file_from_cloudfront(melting_data.userVoiceUrl, temp_voice_path)

        # 노이즈 제거
        voice_file_path = await call_ai_uvr(temp_voice_path, mode="instrument")
        non_echo_file_path = await call_ai_uvr(voice_file_path, mode="echo")

        # 결과 파일 저장
        result_file_name = f"{melting_data.memberId}_clean_voice_file.mp3"
        result_file_path = os.path.join(TEMP_DIR, result_file_name)
        shutil.copy2(non_echo_file_path, result_file_path)

        # MR 다운로드
        temp_instrument_path = os.path.join(TEMP_DIR, "temp_instrument.mp3")
        download_file_from_cloudfront(melting_data.mrUrl, temp_instrument_path)

        # 가수 음성 파일 다운로드
        temp_singer_path = "TEMP/temp_singer_voice.mp3"
        download_file_from_cloudfront(melting_data.singerVoiceUrl, temp_singer_path)

        # 싱크 보정 및 오디오 병합
        temp_melting_song_path = "TEMP/temp_melting_song.mp3"
        mixing_with_timing_adjustment(temp_singer_path, result_file_path, temp_instrument_path, temp_melting_song_path)

        # 오디오 병합
        voice = AudioSegment.from_file(result_file_path)
        instrument = AudioSegment.from_file(temp_instrument_path)
        merged_audio = instrument.overlay(voice)

        # 병합된 오디오 저장
        # temp_merged_path = os.path.join(TEMP_DIR, "merged_result.mp3")
        # merged_audio.export(temp_merged_path, format="mp3")

        # S3에 업로드
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        output_filename = f"song_{melting_data.songId}_{timestamp}.mp3"
        s3_output_path = f"audio/generated_song/{output_filename}"
        cloudfront_url = upload_file_to_cloudfront(temp_melting_song_path, s3_output_path)

        # Redis에 결과 게시
        message = json.dumps({"songId": melting_data.songId, "songUrl": cloudfront_url})
        r.publish('song_results', message)
        print(f"Published to Redis: {message}")

        # 모델 학습 
        if melting_data.endpoint==True: # 학습 필요 여부
            await add_train_data(melting_data.memberId)
            user_info = load_user_info(melting_data.memberId)
            # await train(melting_data.memberId) # 24.10.05 변경
            if len(user_info.train_data_list) == 3:
                await train(melting_data.memberId) # 24.10.05 변경
                r.publish('training_completed', melting_data.memberId)

        # 임시 파일 정리
        temp_singer_path = "TEMP/temp_singer_voice.mp3"
        for temp_file_path in [temp_voice_path, temp_instrument_path, temp_melting_song_path, result_file_path, temp_singer_path]:
            delete_local_file(temp_file_path)

        # 디렉토리 정리
        for directory in [INPUT_DIR, VOICE_DIR, INSTRUMENT_DIR, NON_ECHO_DIR, ONLY_ECHO_DIR]:
            if os.path.exists(directory):
                delete_files_in_directory(directory)

        print(f"Melting process completed for member_id: {melting_data.memberId}, song_id: {melting_data.songId}")

    except Exception as e:
        print(f"Error occurred during melting process: {str(e)}")



async def process_ai_cover(ai_cover_data: AiCoverRequest):
    try:
        # 타겟 원곡 목소리 다운로드
        target_voice_path = f"{TARGET_VOICE_DIR}/target_voice.mp3"
        download_file_from_cloudfront(ai_cover_data.originalSongVoiceUrl, target_voice_path)

        # 추론 (memberVoice -> artistVoice)
        result_audio = await inference_user_voice(ai_cover_data.memberId, target_voice_path, ai_cover_data.memberGender, ai_cover_data.originalVoiceGender)
        aicover_voice_path = f"{AI_COVER_VOICE_DIR}/merged_result.mp3"
        result_audio.export(aicover_voice_path)

        # 타겟 원곡 MR 다운로드
        temp_instrument_path = f"{TEMP_DIR}/temp_instrument.mp3"
        download_file_from_cloudfront(ai_cover_data.originalSongMrUrl, temp_instrument_path)

        # AI Cover 곡 완성
        voice = AudioSegment.from_file(aicover_voice_path)
        instrument = AudioSegment.from_file(temp_instrument_path)
        merged_audio = instrument.overlay(voice)

        aicover_song_path = f"{AI_COVER_SONG_DIR}/merged_result.mp3"
        merged_audio.export(aicover_song_path)

        # S3에 업로드
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        output_filename = f"song_{ai_cover_data.songId}_{timestamp}.mp3"
        s3_output_path = f"audio/generated_song/{output_filename}"
        cloudfront_url = upload_file_to_cloudfront(aicover_song_path, s3_output_path)

        # Redis에 결과 게시
        message = json.dumps({"songId": ai_cover_data.songId, "songUrl": cloudfront_url})
        r = await aioredis.from_url(f"redis://{redis_host}", password=redis_password)
        await r.publish('song_results', message)
        print(f"Published to Redis: {message}")

        # 임시 파일 정리
        for temp_file in [temp_instrument_path]:
            delete_local_file(temp_file)

        # 디렉토리 정리
        for directory in directories_to_clean_after_AI:
            if os.path.exists(directory):
                delete_files_in_directory(directory)
            else:
                print(f"Directory does not exist: {directory}")

        print(f"AI Cover process completed for song_id: {ai_cover_data.songId}")
        print(f"Generated AI Cover URL: {cloudfront_url}")

    except Exception as e:
        print(f"Error occurred during AI Cover process: {str(e)}")




@app.post("/api/rvc-ai/{member_id}/melting-with-training")
async def melting_with_training(
    background_tasks: BackgroundTasks,
    voice_file: UploadFile = File(..., description="WebM 형식의 음성 파일"),
    member_id: str = Path(..., description="멤버 ID"),
    song_id: str = Form(..., description="노래 ID"),
    original_song_mr_url: str = Form(..., description="원곡 MR URL")
):
    """
    노이즈 제거 -> merge(멜팅 곡 생성) -> 모델 학습
    비동기로 처리하고 즉시 응답을 반환합니다.
    """
    async def process_melting():
        try:
            
            # WebM을 WAV로 변환
            # with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_wav:
            #     webm_audio = AudioSegment.from_file(io.BytesIO(await voice_file.read()), format="webm")
            #     webm_audio.export(temp_wav.name, format="wav")
            #     file_path = await save_file_and_get_path(INPUT_DIR, UploadFile(filename="temp.wav", file=open(temp_wav.name, "rb")))

            # --------------------노이즈 제거
            file_path = await save_file_and_get_path(INPUT_DIR, voice_file)
            voice_file_path = await call_ai_uvr(file_path, mode="instrument")
            non_echo_file_path = await call_ai_uvr(voice_file_path, mode="echo")

            os.makedirs(TEMP_DIR, exist_ok=True)
            result_file_name = f"{member_id}_clean_voice_file.mp3"
            result_file_path = os.path.join(TEMP_DIR, result_file_name)

            shutil.copy2(non_echo_file_path, result_file_path)

            # --------------------멜팅곡 생성
            temp_instrument_path = "TEMP/temp_instrument.mp3"
            download_file_from_cloudfront(original_song_mr_url, temp_instrument_path)

            voice = AudioSegment.from_file(result_file_path)
            instrument = AudioSegment.from_file(temp_instrument_path)
            merged_audio = instrument.overlay(voice)

            temp_merged_path = "TEMP/merged_result.mp3"
            merged_audio.export(temp_merged_path)

            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            output_filename = f"song_{song_id}_{timestamp}.mp3"

            s3_output_path = f"audio/generated_song/{output_filename}"
            cloudfront_url = upload_file_to_cloudfront(temp_merged_path, s3_output_path)

            # 레디스에 song_id와 cloudfront_url publish
            message = json.dumps({"songId": song_id, "songUrl": cloudfront_url})
            r.publish('song_results', message)
            print(f"Published to Redis: {message}")

            # --------------------모델 학습
            await add_train_data(member_id)
            await train(member_id)

            user_info = load_user_info(member_id)
            train_data_count = len(user_info.train_data_list)

            print(f"Current training data count for member {member_id}: {train_data_count}")

            if train_data_count == 3:
                r.publish('training_completed', member_id)
                print(f"Published to Redis: Member {member_id} has completed 3 training data")

            
            for temp_file in [result_file_name, temp_instrument_path, temp_merged_path]:
                delete_local_file(temp_file)

            for directory in directories_to_clean:
                if os.path.exists(directory):
                    delete_files_in_directory(directory)
            else:
                print(f"Directory does not exist: {directory}")

            print("All files in specified directories have been deleted.")

            # 처리 완료 후 로그 기록 또는 데이터베이스 업데이트 등을 수행할 수 있습니다.
            print(f"Melting process completed for member_id: {member_id}, song_id: {song_id}")

        except Exception as e:
            # 에러 처리 및 로깅
            print(f"Error occurred during melting process: {str(e)}")

    # 백그라운드 태스크로 멜팅 프로세스 추가
    background_tasks.add_task(process_melting)

    # 즉시 응답 반환
    return JSONResponse(content={"message": "Melting process started"}, status_code=200)


@app.post("/api/rvc-ai/{member_id}/melting")
async def melting(
    background_tasks: BackgroundTasks,
    voice_file: UploadFile = File(..., description="WebM 형식의 음성 파일"),
    member_id: str = Path(..., description="멤버 ID"),
    song_id: str = Form(..., description="노래 ID"),
    original_song_mr_url: str = Form(..., description="원곡 MR URL")
):
    """
    노이즈 제거 -> merge(멜팅 곡 생성) -> 모델 학습
    비동기로 처리하고 즉시 응답을 반환합니다.
    """
    async def process_melting():
        try:
            
            # WebM을 WAV로 변환
            # with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_wav:
            #     webm_audio = AudioSegment.from_file(io.BytesIO(await voice_file.read()), format="webm")
            #     webm_audio.export(temp_wav.name, format="wav")
            #     file_path = await save_file_and_get_path(INPUT_DIR, UploadFile(filename="temp.wav", file=open(temp_wav.name, "rb")))

            # --------------------노이즈 제거
            file_path = await save_file_and_get_path(INPUT_DIR, voice_file)
            voice_file_path = await call_ai_uvr(file_path, mode="instrument")
            non_echo_file_path = await call_ai_uvr(voice_file_path, mode="echo")

            os.makedirs(TEMP_DIR, exist_ok=True)
            result_file_name = f"{member_id}_clean_voice_file.mp3"
            result_file_path = os.path.join(TEMP_DIR, result_file_name)

            shutil.copy2(non_echo_file_path, result_file_path)

            # --------------------멜팅곡 생성
            temp_instrument_path = "TEMP/temp_instrument.mp3"
            download_file_from_cloudfront(original_song_mr_url, temp_instrument_path)

            voice = AudioSegment.from_file(result_file_path)
            instrument = AudioSegment.from_file(temp_instrument_path)
            merged_audio = instrument.overlay(voice)

            temp_merged_path = "TEMP/merged_result.mp3"
            merged_audio.export(temp_merged_path)

            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            output_filename = f"song_{song_id}_{timestamp}.mp3"

            s3_output_path = f"audio/generated_song/{output_filename}"
            cloudfront_url = upload_file_to_cloudfront(temp_merged_path, s3_output_path)

            # 레디스에 song_id와 cloudfront_url publish
            message = json.dumps({"songId": song_id, "songUrl": cloudfront_url})
            r.publish('song_results', message)
            print(f"Published to Redis: {message}")
            
            for temp_file in [result_file_name, temp_instrument_path, temp_merged_path]:
                delete_local_file(temp_file)

            for directory in directories_to_clean:
                if os.path.exists(directory):
                    delete_files_in_directory(directory)
            else:
                print(f"Directory does not exist: {directory}")

            print("All files in specified directories have been deleted.")

            # 처리 완료 후 로그 기록 또는 데이터베이스 업데이트 등을 수행할 수 있습니다.
            print(f"Melting process completed for member_id: {member_id}, song_id: {song_id}")

        except Exception as e:
            # 에러 처리 및 로깅
            print(f"Error occurred during melting process: {str(e)}")

    # 백그라운드 태스크로 멜팅 프로세스 추가
    background_tasks.add_task(process_melting)

    # 즉시 응답 반환
    return JSONResponse(content={"message": "Melting process started"}, status_code=200)


@app.post("/api/rvc-ai/{member_id}/aicover")
async def aicover(
    background_tasks: BackgroundTasks,
    member_id: str = Path(..., description="멤버 ID"),
    request: InferenceRequest = Body(..., description="추론 요청 데이터")
):
    """
    voice AI 모델 추론 (가수voice -> 유저voice) -> 원곡 mr + 보이스 -> AI Cover곡 S3 업로드
    비동기로 처리하고 즉시 응답을 반환합니다.
    """
    async def process_inference():
        try:
            ## 타켓 원곡 목소리
            target_voice_path = f"{TARGET_VOICE_DIR}/target_voice.mp3"
            download_file_from_cloudfront(request.original_song_voice_url, target_voice_path)

            ## 추론 (memberVocie -> artistVoice)
            result_audio = await inference_user_voice(member_id, target_voice_path, request.member_gender, request.original_voice_gender)
            aicover_voice_path = f"{AI_COVER_VOICE_DIR}/merged_result.mp3"
            result_audio.export(aicover_voice_path)

            ## 타겟 원곡 mr 
            temp_instrument_path = "TEMP/temp_instrument.mp3"
            download_file_from_cloudfront(request.original_song_mr_url, temp_instrument_path)

            # AI Cover 곡 완성
            voice = AudioSegment.from_file(aicover_voice_path)
            instrument = AudioSegment.from_file(temp_instrument_path)
            merged_audio = instrument.overlay(voice)

            aicover_song_path = f"{AI_COVER_SONG_DIR}/merged_result.mp3"
            merged_audio.export(aicover_song_path)

            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            output_filename = f"song_{request.song_id}_{timestamp}.mp3"

            s3_output_path = f"audio/generated_song/{output_filename}"
            cloudfront_url = upload_file_to_cloudfront(aicover_song_path, s3_output_path)

            # 레디스에 song_id와 cloudfront_url publish
            message = json.dumps({"songId": request.song_id, "songUrl": cloudfront_url})
            r.publish('song_results', message)
            print(f"Published to Redis: {message}")

            for temp_file in [temp_instrument_path]:
                delete_local_file(temp_file)

            for directory in directories_to_clean_after_AI:
                if os.path.exists(directory):
                    delete_files_in_directory(directory)
            else:
                print(f"Directory does not exist: {directory}")

            print("All files in specified directories have been deleted.")

            print(f"Inference process completed for member_id: {member_id}, song_id: {request.song_id}")
            print(f"Generated AI Cover URL: {cloudfront_url}")

        except Exception as e:
            print(f"Error occurred during inference process: {str(e)}")

    # 백그라운드 태스크로 추론 프로세스 추가
    background_tasks.add_task(process_inference)

    # 즉시 응답 반환
    return JSONResponse(content={"message": "Inference process started"}, status_code=200)


@app.post("/api/rvc-ai/users/{user_id}/training-data")
async def add_train_data(member_id: str = Path(..., description="멤버 id")):
    """
    학습 데이터 단건 추가 API(음원 분리 필요할 경우 분리해서 추가)\n
    """

    user_training_data_path = get_training_path_of(member_id)
    if not os.path.isdir(user_training_data_path):
        os.makedirs(user_training_data_path, exist_ok=True)
        user_info = UserInfo([], 0)
    else:
        user_info = load_user_info(member_id)

    temp_merged_path = f"TEMP/{member_id}_clean_voice_file.mp3"
    file_name = f"{member_id}_training_data_{len(user_info.train_data_list) + 1}.mp3"
    destination_path = os.path.join(user_training_data_path, file_name)
    
    shutil.move(temp_merged_path, destination_path) 
    
    user_info.train_data_list.append(TrainData(file_name=file_name))
    save_user_info(member_id, user_info)

    return len(user_info.train_data_list)



@app.get("/api/rvc-ai/users/{member_id}/training-data")
async def get_training_data_list(member_id: str = Path(..., description="멤버 id")):
    """
    유저 학습데이터 정보 조회
    """
    user_info = load_user_info(member_id)
    return {"user_id":member_id, "user_info":user_info}



@app.post("/api/rvc-ai/users/{member_id}/train")
async def train(member_id: str = Path(..., description="멤버 id")):
    """
    voice AI 모델 학습 API (user_id에 대해 추가된 모든 voice 데이터 를 학습)
    """
    await train_user_voice(member_id)
    return {"success": True}


@app.post("/publish")
async def publish_message(message: str):
    r.publish('channel_name', message)
    return {"stauts:" "Message published"}


#------------------------- exception handler -------------------------

class BusinessException(Exception):
    def __init__(self, msg: str, msg_code: str = None, status_code: int = 400):
        self.msg = msg
        self.msg_code = msg_code
        self.status_code = status_code

@app.exception_handler(BusinessException)
async def http_business_exception_handler(request: Request, exc: BusinessException):
    response ={"msg": exc.msg}
    if exc.msg_code:
        response["msg_code"] = exc.msg_code
    return JSONResponse(
        status_code = exc.status_code,
        content = response,
    )

@app.exception_handler(Exception)
async def http_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": exc.args},
    )

#------------------------- code -------------------------

SR = 22050

def mixing_with_timing_adjustment(singer_voice_path, user_voice_path, mr_path, result_file_path):
    # MR과 목소리 로드 (sr: 샘플링 레이트, 일반적으로 22050으로 설정)
    user_voice, _ = librosa.load(user_voice_path, sr=SR, duration=30)
    singer_voice, _ = librosa.load(singer_voice_path, sr=SR, duration=30)

    # 크로스 코릴레이션을 통해 두 신호의 시간차 분석
    print("타이밍 보정중")
    correlation = np.correlate(user_voice, singer_voice, mode='full')
    lag = np.argmax(correlation) - len(singer_voice)
    lag = -lag
    # lag 값은 샘플 단위의 시간차, 이를 초로 변환
    time_shift = lag / SR

    print(f"타이밍 차이: {time_shift:.4f}초")

    # 최종 오디오 전체 로드 (전체 파일에 보정 적용)
    mr_full, _ = librosa.load(mr_path, sr=SR)
    voice_full, _ = librosa.load(user_voice_path, sr=SR)

    # 타이밍 보정: time_shift만큼 음성을 이동
    if time_shift > 0:
        # 목소리 파일을 뒤로 이동 (앞에 0을 추가)
        voice_shifted = np.pad(voice_full, (int(time_shift * SR), 0), mode='constant')
    else:
        # 음성이 먼저 시작됐을 경우 앞부분을 자름
        voice_shifted = voice_full[int(-time_shift * SR):]

    # 보정 적용한 파일에 맞춰 길이 조정 및 합치기
    min_len = min(len(mr_full), len(voice_shifted))
    mr_full = mr_full[:min_len]
    voice_shifted = voice_shifted[:min_len]

    combined = mr_full + voice_shifted

    # 결과 파일 저장
    sf.write(result_file_path, combined, SR)
    print("타이밍 보정 및 믹스 파일이 저장되었습니다")


def check_file_type(file: UploadFile) -> None:
    if file.content_type not in ["audio/mpeg", "audio/wav", "audio/x-m4a"]:
        raise BusinessException("파일 형식이 지원되지 않습니다. MP3 또는 WAV 파일을 업로드하세요.",
                                "NOT_SUPPORTED_FILE_TYPE")
    
async def get_audio(file: UploadFile) -> AudioSegment:
    contents = await file.read()
    return AudioSegment.from_file(io.BytesIO(contents), format=file.filename.split(".")[-1])

def split_filename(filename: str) -> tuple:
    name, ext = os.path.splitext(filename)
    return (name, ext)

async def save_file_and_get_path(base_dir: str, file: UploadFile) -> str:
    os.makedirs(base_dir, exist_ok=True)
    filename, extension = split_filename(file.filename)
    result_file_full_name = filename+"-"+str(uuid.uuid4())+extension
    result_file_full_path = os.path.join(base_dir, result_file_full_name)
    with open(result_file_full_path, "wb") as buffer:
        buffer.write(await file.read())
    return result_file_full_path

class Path():
    def __init__(self, name: str):
        self.name = name

# 음원 분리 ai 호출
async def call_ai_uvr(file_path: str, mode: str) -> str:
    if mode == "instrument":
        model_name = "HP5_only_main_vocal"
        input_dir = INPUT_DIR
        voice_dir = VOICE_DIR
        instrument_dir = INSTRUMENT_DIR
        prefix = "vocal_"
    elif mode == "echo":
        model_name = "VR-DeEchoNormal"
        input_dir = VOICE_DIR
        voice_dir = NON_ECHO_DIR
        instrument_dir = ONLY_ECHO_DIR
        prefix = "instrument_"
    else:
        raise RuntimeError()
    
    result_generator = ai.uvr(
        model_name,
        "",
        voice_dir,
        [Path(file_path)],
        instrument_dir,
        10,
        "wav"
    )
    result_file_full_name = ""
    for result in result_generator:
        if "Success" not in result:
            raise RuntimeError(result)
        result_file_full_name = prefix + result.replace("->Success", "_10.wav")
    return os.path.join(voice_dir, result_file_full_name)

async def seperate_audio(audio_file: str) -> str:
    file_path = await save_file_and_get_path(INPUT_DIR, audio_file)
    voice_file_path = await call_ai_uvr(file_path, mode="instrument")
    non_echo_file_path = await call_ai_uvr(voice_file_path, mode="echo")
    return non_echo_file_path

def get_training_path_of(user_id: str):
    return os.path.join(USER_TRAINING_DATA_BASE_DIR, user_id)

def get_list_files(directory: str):
    try:
        # 디렉토리 내의 모든 항목을 조회
        all_files = os.listdir(directory)
        # 파일만 필터링
        files = [f for f in all_files if os.path.isfile(os.path.join(directory, f))]
        return files
    except FileNotFoundError:
        print(f"Directory '{directory}' not found.")
        return []
    except PermissionError:
        print(f"Permission denied to access '{directory}'.")
        return []

class TrainData():
    def __init__(self, file_name:str, is_trained:bool=False):
        self.file_name = file_name
        self.is_trained = is_trained
    
    def to_dict(self):
        return {
            'file_name': self.file_name,
            'is_trained': self.is_trained
        }

class UserInfo():
    def __init__(self, train_data_list:List[TrainData], trained_epoch:int):
        self.train_data_list = train_data_list
        self.trained_epoch = trained_epoch
    
    def train_all(self):
        for data in self.train_data_list:
            data.is_trained = True

    def to_dict(self):
        return {
            'train_data_list': [data.to_dict() for data in self.train_data_list],
            'trained_epoch': self.trained_epoch
        }
    

# 유저 학습 데이터 정보 저장
def save_user_info(user_id: str, info: UserInfo):
    base_path = get_training_path_of(user_id)
    with open(os.path.join(base_path, "info.json"), 'w') as file:
        json.dump(info.to_dict(), file, indent=4)  # indent는 가독성을 위한 들여쓰기

# 유저 학습 데이터 정보 불러오기
def load_user_info(user_id: str) -> UserInfo:
    base_path = get_training_path_of(user_id)
    with open(os.path.join(base_path, "info.json"), 'r') as file:
        data = json.load(file)
        info = UserInfo(**data)
        info.train_data_list = [TrainData(**d) for d in info.train_data_list]
        return info

# 유저 보이스 학습 프로세스
async def train_user_voice(user_id: str):
    user_training_data_path = get_training_path_of(user_id)
    if not get_list_files(user_training_data_path):
        raise BusinessException("해당 사용자 training data가 없습니다",
                                "NOT_EXISTS_USER_TRAIN_DATA")
    user_info = load_user_info(user_id)
    # for training_data in user_info.train_data_list: # 24.10.05 주석처리
    #     if training_data.is_trained:
    #         print("pass")
    #         continue
    #     await call_ai_train(user_id, training_data.file_name, user_info.trained_epoch + UNIT_EPOCH_PER_VOICE)
    #     user_info.trained_epoch += UNIT_EPOCH_PER_VOICE

    await call_ai_train_by_dir(user_id, UNIT_EPOCH_PER_VOICE) # 24.10.05 폴더 학습으로 수정
    user_info.train_all()
    save_user_info(user_id, user_info)

# 유저 보이스 학습 ai 호출 (by file, 기존 버전)
async def call_ai_train(user_id: str, file_name:str, total_epoch: int):
    num_of_processor = 8
    save_epoch = UNIT_EPOCH_PER_VOICE//2
    batch_size = 4
    file_path = os.path.join(get_training_path_of(user_id), file_name)
    try:
        result_generator = ai.train1key(
            user_id,
            "40k",
            True,
            file_path,
            0,
            num_of_processor,
            "harvest",
            save_epoch,
            total_epoch,
            batch_size,
            "Yes",
            "pretrained_v2/f0G40k.pth",
            "pretrained_v2/f0D40k.pth",
            "0",
            "Yes",
            "No",
            "v2",
        )
        for result in result_generator:
            print("result", result)
    except ValueError as e:
        pass


# 유저 보이스 학습 ai 호출 (by directory, 24.10.05)
async def call_ai_train_by_dir(user_id: str, total_epoch: int):
    num_of_processor = 8
    save_epoch = total_epoch
    batch_size = 4
    dir_path = get_training_path_of(user_id)
    try:
        result_generator = ai.train1key(
            user_id,
            "40k",
            True,
            dir_path,
            0,
            num_of_processor,
            "harvest",
            save_epoch,
            total_epoch,
            batch_size,
            "Yes",
            "pretrained_v2/f0G40k.pth",
            "pretrained_v2/f0D40k.pth",
            "0",
            "Yes",
            "No",
            "v2",
        )
        for result in result_generator:
            print("result", result)
    except ValueError as e:
        pass
    
# 유저 보이스 추론 프로세스
async def inference_user_voice(member_id: str, target_voice_path: str, user_gender: Gender, input_singer_gender: Gender) -> AudioSegment:
    if user_gender == Gender.MALE.value and input_singer_gender == Gender.FEMALE.value:
        up_key = -12
    elif user_gender == Gender.FEMALE.value and input_singer_gender == Gender.MALE.value:
        up_key = 12
    else:
        up_key = 0
    return await call_ai_inference(member_id, target_voice_path, up_key)


# 유저 보이스 추론 ai 호출
async def call_ai_inference(member_id: str, target_voice_path: str, up_key:int) -> AudioSegment:
    print("up_key = ",up_key)
    try:
        ai.get_vc(f"{member_id}.pth", 0.33, 0.33)
    except FileNotFoundError:
        raise BusinessException("학습된 모델 정보가 없는 유저입니다", "NOT_TRAINED_USER")
    result, (sampling_rate, audio_np) = ai.vc_single(
        0,
        target_voice_path,
        up_key,
        None,
        "rmvpe",
        "",
        "",
        0.75,
        3,
        0,
        0.25,
        0.33
    )
    audio_segment = AudioSegment(
    audio_np.tobytes(),
    frame_rate=sampling_rate,
    sample_width=2,  # 16비트 PCM
    channels=1
    )
    return audio_segment


# if __name__ == "__main__":

#     webbrowser.open("http://127.0.0.1:8000/docs") # swagger-ui open

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

#------------------------- S3 -------------------------



def download_file_from_cloudfront(s3_url: str, local_path: str) -> None:
    """
    S3 URL을을 통해 파일을 다운로드하고 로컬에 저장한다.

    Args:
        s3_url (str): 다운로드할 파일의 S3 URL
        local_path (str): 파일을 저장할 로컬 경로

    Raises:
        HTTPException: 다운로드 실패 시 발생
    """

    try:
        # S3 URL 파싱
        parsed_url = urlparse(s3_url)
        bucket_name = parsed_url.netloc.split('.')[0]
        object_key = parsed_url.path.lstrip('/')

        # S3 클라이언트 생성
        s3_client = boto3.client('s3')

        # 로컬 디렉토리 생성
        os.makedirs(os.path.dirname(local_path), exist_ok=True)

        # 파일 다운로드
        s3_client.download_file(
            s3_bucket_name,
            Key=object_key,
            Filename=local_path
        )

        print(f"파일이 성공적으로 다운로드되었습니다: {local_path}")
    except Exception as e:
        print(f"파일 다운로드 중 오류 발생: {str(e)}")
        raise



    
def upload_file_to_cloudfront(local_path: str, s3_path: str) -> str:
    """
    처리된 결과 파일을 S3에 업로드하고 URL을 반환한다.

    Args:
        local_path (str): 업로드할 로컬 파일 경로
        s3_path (str): 저장될 경로

    Returns:
        str: 업로드된 파일의 CloudFront URL

    Raises:
        HTTPException: 파일 업로드 실패 시 발생
    """
    try:
        if not os.path.exists(local_path):
            raise FileNotFoundError("파일을 찾을 수 없습니다.")
        
        s3_client.upload_file(
            local_path,
            s3_bucket_name,
            s3_path,
            ExtraArgs={'ContentType': 'audio/mp3'}
        )

        cloudfront_url = f"https://{cloudfront_domain}/{s3_path}"

        logging.info(f"파일이 성공적으로 업로드되었습니다. CloudFront URL: {cloudfront_url}")
        return cloudfront_url

    except FileNotFoundError as e:
        error_message = str(e)
        logging.error(error_message)
        raise HTTPException(status_code=404, detail=error_message)

    except ClientError as e:
        error_message = f"S3 업로드에 실패했습니다: {str(e)}"
        logging.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)


def delete_local_file(file_path: str) -> None:
    """
    로컬 파일을 삭제한다.
    """
    try:
        os.remove(file_path)
    except OSError as e:
        print("파일 삭제를 실패했습니다.")

def delete_files_in_directory(directory):
    try:
        for filename in os.listdir(directory):
            file_path = os.path.join(directory, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)
                print(f"Deleted file: {file_path}")
        print(f"Cleaned directory: {directory}")
    except Exception as e:
        print(f"Error cleaning directory {directory}: {e}")


