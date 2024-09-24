import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Switch } from '@/components/ui/switch'
import Heart from '@/components/icon/Heart'
import { X } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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

  const openDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const deleteAlbum = () => {
    // 앨범 삭제 API 호출
    console.log('앨범 삭제됨', album.id)
    setIsDeleteModalOpen(false)
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  return (
    <div
      className="relative flex mb-4 cursor-pointer hover:bg-gray-100"
      onClick={goToAlbumDetail}
    >
      <img
        src={album.coverImage}
        alt={album.albumName}
        className="w-24 h-24 mr-4 rounded-lg"
      />

      <div className="flex flex-col justify-between w-full p-1">
        <div className="flex justify-between items-center font-bold text-base relative">
          <span>{truncateText(album.albumName, 18)}</span>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                onClick={openDeleteModal}
                className="focus:outline-none ml-4"
              >
                <X size={22} className="text-primary-400" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>앨범 삭제</AlertDialogTitle>
                <AlertDialogDescription>
                  정말로 이 앨범을 삭제하시겠습니까? 이 작업은 되돌릴 수
                  없습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={(e) => {
                    e.stopPropagation()
                    closeDeleteModal()
                  }}
                >
                  취소
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteAlbum()
                  }}
                >
                  삭제
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="text-sm">{truncateText(album.artistName, 18)}</div>
        <div className="flex items-center space-x-2 text-sm">
          <button onClick={toggleLike} className="focus:outline-none z-0">
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
              className={`rounded-full border-2 transition-colors z-0
                ${isPublic ? 'bg-primary-400' : 'bg-gray-200'}`}
            ></Switch>
          </div>
        </div>
      </div>
    </div>
  )
}
