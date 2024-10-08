import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import SongSelection from './SongSelection'
import HashtagSelector from './HashtagSelector'
import SubmitButton from '../Button/SubmitButton'
import GenreSelector from './GenreSelector'
import AlbumCoverSelector from './AlbumCoverSelector'
import { useAlbumContext } from '@/contexts/AlbumContext'
import { albumApi } from '@/apis/albumApi.ts'
import {
  AiDescriptionRequestDto,
  AlbumCreateRequestDto,
  CreateAlbumPayload,
} from '@/types/album.ts'
import { convertDateToWord } from '@/utils/dateUtil.ts'

export default function AlbumForm() {
  const [releaseDate, setReleaseDate] = useState<string>('')
  const navigate = useNavigate()

  const {
    albumName,
    setAlbumName,
    albumIntro,
    setAlbumIntro,
    selectedSongs,
    titleSongIndex,
    selectedGenres,
    selectedHashtags,
    selectedCover,
    selectedCoverFile,
    selectedDefaultCoverIndex,
    resetAlbum,
  } = useAlbumContext()

  // 유효성 검사 상태
  const [isAlbumNameValid, setIsAlbumNameValid] = useState(false)
  const [isSongValid, setIsSongValid] = useState(false)
  const [isGenreValid, setIsGenreValid] = useState(false)
  const [isHashtagValid, setIsHashtagValid] = useState(false)
  const [isCoverValid, setIsCoverValid] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const today = new Date()
    const formattedDate = convertDateToWord(today)
    setReleaseDate(formattedDate)
  })

  // 앨범명 유효성 검사
  useEffect(() => {
    const nameRegex = /^[a-zA-Z0-9가-힣\s]{2,20}$/
    setIsAlbumNameValid(nameRegex.test(albumName))
  }, [albumName])

  // 곡 유효성 검사
  useEffect(() => {
    setIsSongValid(selectedSongs.length > 0)
  }, [selectedSongs])

  // 장르 유효성 검사
  useEffect(() => {
    setIsGenreValid(selectedGenres.length > 0)
  }, [selectedGenres])

  // 해시태그 유효성 검사
  useEffect(() => {
    setIsHashtagValid(selectedHashtags.length > 0)
  }, [selectedHashtags])

  // 앨범 커버 유효성 검사
  useEffect(() => {
    setIsCoverValid(selectedCover !== null)
  }, [selectedCover])

  useEffect(() => {
    if (isSongValid && isGenreValid && isHashtagValid && isCoverValid) {
      setIsFormValid(true)
    }
  }, [isSongValid, isGenreValid, isHashtagValid, isCoverValid])

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        let generatedIntro = albumIntro

        // albumIntro가 비어 있는 경우 AI 소개 요청 수행
        if (!albumIntro) {
          const aiDescriptionRequestDto: AiDescriptionRequestDto = {
            songs: selectedSongs.map((song) => song.songId),
            genres: selectedGenres,
            hashtags: selectedHashtags,
            albumName,
          }

          try {
            // AI 소개 생성 요청
            generatedIntro = await albumApi.createAiDescription(
              aiDescriptionRequestDto,
            )
            setAlbumIntro(generatedIntro)
          } catch (error) {
            console.error('AI 소개 생성 중 오류 발생:', error)
            return // AI 소개 생성에 실패한 경우 제출 진행 중단
          }
        }

        // 앨범 생성 요청 DTO 생성
        const albumCreateRequestDto: AlbumCreateRequestDto = {
          albumName: albumName,
          albumDescription: generatedIntro,
          songs: selectedSongs.map((song) => song.songId),
          titleSongId: titleSongIndex || selectedSongs[0]?.songId, // titleSongId는 첫 번째 곡으로 가정
          genres: selectedGenres,
          hashtags: selectedHashtags,
          defaultCoverNumber: selectedDefaultCoverIndex || undefined,
        }

        let payload: CreateAlbumPayload

        // 기본 이미지가 선택된 경우
        if (selectedDefaultCoverIndex !== null) {
          payload = {
            albumCreateRequestDto,
            albumCoverImage: new File([], 'default-image.jpg'), // 빈 파일 설정
          }
        } else if (selectedCoverFile) {
          // 사용자 또는 AI 이미지가 선택된 경우
          payload = {
            albumCreateRequestDto,
            albumCoverImage: selectedCoverFile,
          }
        } else {
          console.error('앨범 커버 이미지가 없습니다.')
          return
        }

        // API 호출
        const response = await albumApi.createAlbum(payload)
        // 앨범 생성 후 앨범 컨텍스트 초기화
        resetAlbum()
        navigate(`/album/detail/${response.albumId}`, { replace: true })
      } catch (error) {
        console.error('앨범 생성 중 오류 발생:', error)
      }
    }
  }

  return (
    <form className="space-y-6">
      <div>
        <Label htmlFor="hashtag" className="font-semibold">
          선정된 곡<span className="text-primary-400 ml-1">*</span>
        </Label>
        <SongSelection />
      </div>
      <div className="space-y-3">
        <Label htmlFor="albumName" className="font-semibold">
          앨범 명<span className="text-primary-400 ml-1">*</span>
        </Label>
        <div className="relative">
          <Input
            id="albumName"
            type="text"
            placeholder="앨범 명을 입력해주세요"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            className={`${albumName ? 'border-primary-400' : ''}`}
            autoComplete="off"
            spellCheck="false"
          />
          <div className="h-5">
            <span
              className={`absolute right-0 -bottom-0.1 text-xs ${albumName.length <= 20 && albumName.length > 0 ? 'text-primary-400' : 'text-gray'} ${albumName.length > 20 ? 'text-status-warning' : ''} `}
            >
              {albumName.length}/20
            </span>
            {!isAlbumNameValid && albumName.length > 0 && (
              <p className="text-status-warning text-xs">
                앨범명은 2-20자의 한글, 영문, 숫자만 가능합니다.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <Label htmlFor="albumName" className="font-semibold">
          앨범 소개
        </Label>
        <div className="relative">
          <Textarea
            id="albumDetail"
            className={`min-h-[100px] ${albumIntro ? 'border-primary-400' : ''}`}
            placeholder={`앨범에 대한 소개를 입력해주세요.\n입력하지 않으면 AI가 자동으로 생성합니다.`}
            value={albumIntro}
            onChange={(e) => setAlbumIntro(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          ></Textarea>
          <p
            className={`absolute right-2 bottom-0.1 mt-1 text-sm  ${albumIntro ? 'text-primary-400' : 'text-gray'}`}
          >
            {albumIntro.length}/1000
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <Label htmlFor="genre" className="font-semibold">
          장르<span className="text-primary-400 ml-1">*</span>
        </Label>
        <GenreSelector />
      </div>
      <div>
        <Label htmlFor="hashtag" className="font-semibold">
          해시태그<span className="text-primary-400 ml-1">*</span>
        </Label>
        <HashtagSelector useAlbumContextFlag={true} maxHashtags={3} />
      </div>
      <div>
        <Label htmlFor="hashtag" className="font-semibold">
          앨범 커버<span className="text-primary-400 ml-1">*</span>
        </Label>
        <AlbumCoverSelector />
      </div>
      <div className="text-gray text-center">
        <p>발매 일자 : {releaseDate}</p>
      </div>
      <SubmitButton
        conditions={[
          isAlbumNameValid,
          isGenreValid,
          isHashtagValid,
          isCoverValid,
        ]}
        onClick={handleSubmit}
        text="생성하기"
      />
    </form>
  )
}
