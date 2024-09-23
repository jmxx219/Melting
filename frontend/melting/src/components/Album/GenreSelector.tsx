import { useNavigate } from 'react-router-dom'

import { Hash } from 'lucide-react'
import { useAlbumContext } from '@/contexts/AlbumContext'
import { Button } from '@/components/ui/button'

export default function GenreSelector() {
  const navigate = useNavigate()
  const { selectedGenres } = useAlbumContext()

  const onGenreEdit = () => {
    navigate('/album/create/genre-selection')
  }

  return (
    <div className="flex justify-between items-center relative border-b-2 pb-3 px-2">
      <div>
        {selectedGenres.length > 0 ? (
          <span>{selectedGenres.join(', ')}</span>
        ) : (
          <span className="text-gray-400">장르를 추가해주세요</span>
        )}
      </div>
      <Button
        type="button"
        variant="link"
        onClick={onGenreEdit}
        className="absolute bottom-9 -right-3 text-primary-400"
      >
        {selectedGenres.length > 0 ? '수정하기' : '추가하기'}
      </Button>
      <Hash
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${selectedGenres.length > 0 ? 'text-primary-400' : 'text-gray-400'}`}
      />
    </div>
  )
}
