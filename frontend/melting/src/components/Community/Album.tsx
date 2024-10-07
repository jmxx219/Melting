import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AlbumRankingResponseDto } from '@/types/album'
// import Play from '../Icon/Play'
import { Play } from 'lucide-react'

interface AlbumProps {
  album: AlbumRankingResponseDto
}

export default function Album({ album }: AlbumProps) {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const albumId = album.albumId

  const handlePlayClick = () => {
    navigate(`/album/play`, { state: { albumId } })
  }

  const handleAlbumClick = () => {
    navigate(`/album/detail/${albumId}`)
  }

  return (
    <div className="w-[150px] h-full">
      <div className="relative w-36 h-36">
        <img
          src={album.albumCoverImageUrl}
          alt={`${album.albumName}`}
          className="w-full h-full object-cover rounded-lg"
          onClick={handleAlbumClick}
        />
        <button
          type="button"
          onClick={handlePlayClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`absolute top-2 right-2 rounded-full  transition-colors duration-200 `}
        >
          <Play
            className="text-white shadow-2xl"
            fill={isHovered ? '#ffaf25' : '#ffffff'}
          />
        </button>
      </div>
      <div className="my-2 text-left">
        <h3 className="text-sm font-bold truncate">{album.albumName}</h3>
        <p className="text-xs text-gray-500 truncate">
          {album.creatorNickname}
        </p>
      </div>
    </div>
  )
}
