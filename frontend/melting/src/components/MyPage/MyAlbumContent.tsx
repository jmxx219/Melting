import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Switch } from '@/components/ui/switch'
import Heart from '@/components/Icon/Heart'
import { X, Play } from 'lucide-react'
import { formatLikeCount } from '@/utils/numberUtil'
import ConfirmDialog from '@/components/Common/ConfirmDialog'

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
  viewType: 'my' | 'liked'
}

export default function MyAlbumContent({ album, viewType }: MyAlbumProps) {
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(album.isLiked)
  const [isPublic, setIsPublic] = useState(album.isPublic)

  const goToAlbumDetail = () => {
    navigate(`/album/${album.id}`)
  }

  const goToPlayAlbum = (e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: 앨범 재생 화면으로 이동
    navigate(`/album/play`, { state: album.id })
  }

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    // TODO: 좋아요 상태 업데이트 API 호출
  }

  const handleSwitchChange = (checked: boolean) => {
    setIsPublic(checked)
    // TODO: 공개/비공개 상태 업데이트 API 호출
  }
  const deleteAlbum = () => {
    // TODO: 앨범 삭제 API 호출
    console.log('앨범 삭제: ', album.id)

    if (viewType === 'my') {
      navigate('/mypage/my')
    } else if (viewType === 'liked') {
      navigate('/mypage/liked')
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  return (
    <div className="relative flex mb-4" onClick={goToAlbumDetail}>
      <div className="relative mr-2 w-24 h-24 flex-shrink-0">
        <img
          src={album.coverImage}
          alt={album.albumName}
          className="absolute inset-0 w-full h-full rounded-lg object-cover"
        />
        <button
          type="button"
          onClick={goToPlayAlbum}
          className="absolute top-1 right-1 p-1 rounded-full shadow-lg"
        >
          <Play size={26} className="text-white fill-white" />
        </button>
      </div>

      <div className="flex flex-col justify-between w-full p-1">
        <div className="flex justify-between items-center font-bold text-base relative">
          <span>{truncateText(album.albumName, 20)}</span>

          {viewType === 'my' && (
            <ConfirmDialog
              title="앨범 삭제"
              description="정말로 이 앨범을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
              onConfirm={deleteAlbum}
              triggerText={<X size={22} className="text-primary-400" />}
              triggerClassName="ml-4"
            />
          )}
        </div>

        <div className="text-sm">{truncateText(album.artistName, 20)}</div>
        <div className="flex items-center space-x-2 text-sm">
          <button
            type="button"
            onClick={toggleLike}
            className="focus:outline-none z-0"
          >
            <Heart
              fill={isLiked ? '#FFAF25' : '#ADADAD'}
              fillOpacity={isLiked ? 1 : 0.4}
            />
          </button>
          <span>
            {viewType === 'my'
              ? album.likeCount.toLocaleString()
              : formatLikeCount(album.likeCount)}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>{album.releaseDate}</span>

          {viewType === 'my' && (
            <div className="flex items-center space-x-2">
              <Switch
                id={`album-${album.id}-switch`}
                checked={isPublic}
                onCheckedChange={handleSwitchChange}
                onClick={(e) => e.stopPropagation()}
                className={`rounded-full border-2 transition-colors z-0
                ${isPublic ? 'bg-primary-400' : 'bg-gray-200'}`}
              ></Switch>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
