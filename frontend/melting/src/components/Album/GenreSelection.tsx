import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import SubmitButton from '../Button/SubmitButton'

const genres = [
  '가요',
  '팝',
  '락',
  '하우스',
  '테크노',
  '힙합',
  '재즈',
  '클래식',
  'R&B/Soul',
  '블루스',
  '포크',
  '발라드',
  '트로트',
  '라틴',
  '전자음악',
]

export default function GenreSelection() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const initialGenres = location.state?.initialGenres || []
    setSelectedGenres(initialGenres)
  }, [location.state])

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre)
      } else if (prev.length < 5) {
        return [...prev, genre]
      }
      return prev
    })
  }

  const handleSubmit = () => {
    navigate('/album/create', { state: { selectedGenres } })
  }
  return (
    <div className="flex flex-col justify-between p-4">
      <div className="mb-96">
        <h1 className="text-2xl font-bold mb-4">장르</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {genres.map((genre, index) => (
            <Button
              key={index}
              variant={selectedGenres.includes(genre) ? 'default' : 'tag'}
              onClick={() => toggleGenre(genre)}
              className={`${selectedGenres.includes(genre) ? 'bg-primary-400 text-white' : ''} rounded-full`}
            >
              #{genre}
            </Button>
          ))}
        </div>
        <p className="text-sm text-primary-500 mb-4">
          ※ 장르는 최소 1개에서 최대 5개까지 등록할 수 있습니다.
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
