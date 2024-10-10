import { Play } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type AlbumCoverProps = {
  width: number
  src: string
  alt?: string
  albumId: number
}

export default function AlbumCover({
  width,
  src,
  alt = '이미지가 존재하지 않습니다',
  albumId,
}: AlbumCoverProps) {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const handlePlayClick = () => {
    navigate(`/album/play`, { state: { albumId } })
  }
  return (
    <div className={`w-[${width}px] h-full`}>
      <div className="relative">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-lg"
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
    </div>
  )
}
