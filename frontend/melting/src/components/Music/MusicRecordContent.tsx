import { Mic, RotateCcw } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import AudioPlayer, { AudioPlayerHandle } from './AudioPlayer'
import { songApi } from '@/apis/songApi'
import AlertModal from '../Common/AlertModal'

interface MusciRecordProps {
  lyrics?: string
  audioSrc?: string
  originalSongId?: number
}

export default function MusciRecordContent({
  lyrics = '',
  audioSrc = '',
  originalSongId = -1,
}: MusciRecordProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioPlayerRef = useRef<AudioPlayerHandle>(null)
  const navigate = useNavigate()
  const dialogMessages = [
    '멜팅하기가 완료되었습니다.',
    '내가 등록한 곡&앨범 에서 확인 가능합니다.',
  ]
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    navigate('/mypage/my')
  }

  const stopMicrophoneUsage = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.stop()
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsRecording(false)
    audioPlayerRef.current?.stop()
  }, [])

  const processRecordedAudio = useCallback(() => {
    const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
    return blob
  }, [])

  const resetRecording = useCallback(() => {
    stopMicrophoneUsage()
    setIsEnd(false)
    chunksRef.current = []
  }, [stopMicrophoneUsage])

  const handleCancel = useCallback(() => {
    resetRecording()
    navigate('/music/list', { state: { type: 'melting' } })
  }, [navigate, resetRecording])

  const handleComplete = useCallback(async () => {
    if (isEnd && !isRecording) {
      // 녹음이 완료된 경우, API로 전송
      const recordedBlob = processRecordedAudio()

      const response = await songApi.meltingApi(originalSongId, recordedBlob)

      if (response) {
        setIsDialogOpen(true)
      }
    }
  }, [isEnd, isRecording, processRecordedAudio, navigate])

  const startRecording = useCallback(async () => {
    try {
      resetRecording()
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
      streamRef.current = stream
      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        processRecordedAudio()
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      audioPlayerRef.current?.play()
    } catch (err) {
      console.error('Error accessing the microphone', err)
    }
  }, [resetRecording, processRecordedAudio])

  const handleRecordClick = useCallback(() => {
    if (isRecording || isEnd) {
      resetRecording()
    } else {
      startRecording()
    }
  }, [isRecording, isEnd, resetRecording, startRecording])

  const lyricsLines = lyrics.split('\n')

  const handleAudioEnded = useCallback(() => {
    setIsEnd(true)
    stopMicrophoneUsage()
    processRecordedAudio()
  }, [stopMicrophoneUsage, processRecordedAudio])

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow">
        <div className="px-4 py-2">
          {lyricsLines.map((line, index) => (
            <div key={index} className="text-[#A5A5A5] text-center my-1">
              {line}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="text-center pb-5 pt-10">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="w-20 h-20 bg-[#FFAF25] rounded-full"
          onClick={handleRecordClick}
        >
          {isRecording || isEnd ? (
            <RotateCcw className="w-full h-full p-5 text-white" />
          ) : (
            <Mic className="w-full h-full p-5 text-white" />
          )}
        </Button>
      </div>
      <AudioPlayer
        ref={audioPlayerRef}
        disabled={false}
        audioSrc={audioSrc}
        onEnded={handleAudioEnded}
      />

      {/* {isEnd && recordedAudioUrl && (
        <div className="mt-5">
          <h3 className="text-center text-lg font-bold">녹음된 파일 재생</h3>
          <AudioPlayer
            audioSrc={recordedAudioUrl}
            onEnded={() => console.log('Playback ended')}
          />
        </div>
      )} */}

      <div className="text-center">
        <Button
          type="button"
          className={`w-full rounded-full font-bold py-7 text-white ${
            !isRecording && !isEnd
              ? 'bg-[#A5A5A5]'
              : isEnd
                ? 'bg-[#FFAF25]'
                : 'bg-[#A5A5A5]'
          }`}
          onClick={isEnd && !isRecording ? handleComplete : undefined}
          disabled={isEnd && !isRecording ? false : true}
        >
          완료
        </Button>
        <span className="inline-block pt-3 text-center" onClick={handleCancel}>
          취소
        </span>
      </div>
      {isDialogOpen && (
        <AlertModal
          title="멜팅 완료"
          messages={dialogMessages}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  )
}
