import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Switch } from '@/components/ui/switch'
import Heart from '@/components/icon/Heart'

interface AlbumData {
  id: number
  coverImage: string
  albumName: string
  artistName: string
  isLiked: boolean
  likeCount: number
  releaseDate: string
  isPublic: boolean
}

interface MyAlbumProps {
  album: AlbumData
}

export default function MyAlbum({ album }: MyAlbumProps) {
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(album.isLiked)
  const [isPublic, setIsPublic] = useState(album.isPublic)

  const goToAlbumDetail = () => {
    navigate(`/album/${album.id}`)
  }

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    // 좋아요 상태 업데이트 API 호출
  }
  const handleSwitchChange = (checked: boolean) => {
    setIsPublic(checked)
    // 공개/비공개 상태 업데이트 API 호출
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  return (
    <div className="flex mb-4 cursor-pointer" onClick={goToAlbumDetail}>
      <img
        src={album.coverImage}
        alt={album.albumName}
        className="w-24 h-24 mr-4 rounded-lg"
      />

      <div className="flex flex-col justify-between w-full p-1">
        <div className="font-bold text-base">
          {truncateText(album.albumName, 22)}
        </div>
        <div className="text-sm"> {truncateText(album.artistName, 20)}</div>
        <div className="flex items-center space-x-2 text-sm">
          <button onClick={toggleLike} className="focus:outline-none">
            <Heart
              fill={isLiked ? '#FFAF25' : '#ADADAD'}
              fillOpacity={isLiked ? 1 : 0.4}
            />
          </button>
          <span>{album.likeCount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>{album.releaseDate}</span>

          <div className="flex items-center space-x-2">
            <Switch
              id={`album-${album.id}-switch`}
              checked={isPublic}
              onCheckedChange={handleSwitchChange}
              onClick={(e) => e.stopPropagation()}
              className={`rounded-full border-2 transition-colors 
                ${isPublic ? 'bg-primary-400' : 'bg-gray-200'}`}
            ></Switch>
          </div>
        </div>
      </div>
    </div>
  )
}
