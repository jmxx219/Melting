import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAlbumContext } from '@/contexts/AlbumContext'
import { Button } from '@/components/ui/button'
import SubmitButton from '../Button/SubmitButton'
import { albumApi } from '@/apis/albumApi.ts'
import { GenreResponseDto } from '@/types/album.ts'

export default function GenreSelection() {
  const { selectedGenres, setSelectedGenres } = useAlbumContext()
  const navigate = useNavigate()
  const [genres, setGenres] = useState<string[]>([])

  useEffect(() => {
    // getAllGenres API 호출
    const fetchGenres = async () => {
      try {
        const data = await albumApi.getAllGenres()
        const genreList = data.map(
          (item: GenreResponseDto) => item.content ?? '',
        )
        setGenres(genreList)
      } catch (error) {
        console.error('장르 목록 가져오기 실패:', error)
      }
    }

    fetchGenres()
  }, [])

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev: string[]): string[] => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre)
      } else if (prev.length < 3) {
        return [...prev, genre]
      } else {
        return prev
      }
    })
  }

  const handleSubmit = () => {
    navigate('/album/create')
  }
  return (
    <div className="flex flex-col justify-between flex-1 p-4">
      <div className="">
        <h1 className="tenxt-2xl font-bold mb-4">장르</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {genres.map((genre) => (
            <Button
              type="button"
              key={genre}
              variant={selectedGenres.includes(genre) ? 'default' : 'tag'}
              onClick={() => toggleGenre(genre)}
              className={`rounded-full ${
                selectedGenres.includes(genre)
                  ? 'bg-primary-400 text-white' // 선택된 경우 배경은 primary, 글씨는 흰색
                  : 'text-primary-400'
              }
              `}
              disabled={
                !selectedGenres.includes(genre) && selectedGenres.length >= 3
              }
            >
              #{genre}
            </Button>
          ))}
        </div>
        <p className="text-sm text-primary-500 mb-4">
          ※ 장르는 최소 1개에서 최대 3개까지 등록할 수 있습니다.
        </p>
      </div>
      <SubmitButton
        conditions={[selectedGenres.length > 0]}
        text="장르 등록하기"
        onClick={handleSubmit}
      />
    </div>
  )
}
