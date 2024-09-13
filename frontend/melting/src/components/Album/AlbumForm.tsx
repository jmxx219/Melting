import { useEffect, useState } from 'react'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import SongSelection from './SongSelection'
import GenreSelection from './GenreSelection'
import HashtagSelection from './HashtagSelection'
import SubmitButton from '../Button/SubmitButton'

export default function AlbumForm() {
  const [albumName, setAlbumName] = useState('')
  const [albumIntro, setAlbumIntro] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [selectedCover, setSelectedCover] = useState<string | null>(null)
  const [releaseDate, setReleaseDate] = useState<string>('')

  // 유효성 검사 상태
  const [isAlbumNameValid, setIsAlbumNameValid] = useState(false)
  const [isGenreValid, setIsGenreValid] = useState(false)
  const [isHashtagValid, setIsHashtagValid] = useState(false)
  const [isCoverValid, setIsCoverValid] = useState(false)
  const isFormValid = albumName.trim() !== '' && selectedCover !== null

  const handleSubmit = () => {
    if (isFormValid) {
      // Submit logic here
      console.log('Form submitted')
    }
  }

  useEffect(() => {
    const today = new Date()
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`

    setReleaseDate(formattedDate)
  })

  // 앨범명 유효성 검사
  useEffect(() => {
    const nameRegex = /^[a-zA-Z0-9가-힣\s]{2,20}$/
    setIsAlbumNameValid(nameRegex.test(albumName))
  }, [albumName])

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

  return (
    <form className="space-y-6">
      AlbumForm
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
          />
          <div className="h-5">
            <span
              className={`absolute right-0 -bottom-0.1 text-xs ${albumName.length <= 20 && albumName.length > 0 ? 'text-primary-400' : 'text-gray'} ${albumName.length > 20 ? 'text-status-warning' : ''} `}
            >
              {albumName.length}/20
            </span>
            {!isAlbumNameValid && (
              <p className="text-status-warning text-xs">
                앨범명은 2-20자의 한글, 영문, 숫자만 가능합니다.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-3 ">
        <Label htmlFor="albumName" className="font-semibold">
          앨범 소개
        </Label>
        <div className="relative">
          <Textarea
            id="albumDetail"
            className={`min-h-[100px] ${albumIntro ? 'border-primary-400' : ''}`}
            placeholder={`앨범에 대한 소개를 입력해주세요.\n입력하지 않으면 AI가 자동으로 생성합니다.`}
            onChange={(e) => setAlbumIntro(e.target.value)}
          ></Textarea>
          <p
            className={`absolute right-2 bottom-0.1 mt-1 text-sm  ${albumIntro ? 'text-primary-400' : 'text-gray'}`}
          >
            {albumIntro.length}/1000
          </p>
        </div>
      </div>
      <div>
        <Label htmlFor="genre" className="font-semibold">
          장르<span className="text-primary-400 ml-1">*</span>
        </Label>
        <GenreSelection />
      </div>
      <div>
        <Label htmlFor="hashtag" className="font-semibold">
          해시태그<span className="text-primary-400 ml-1">*</span>
        </Label>
        <HashtagSelection />
      </div>
      <div>
        <Label htmlFor="hashtag" className="font-semibold">
          앨범 커버<span className="text-primary-400 ml-1">*</span>
        </Label>
        <HashtagSelection />
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
