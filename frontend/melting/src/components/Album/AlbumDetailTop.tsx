import { AlbumDetailInfo } from '@/types/album'
import { ChevronDown, ChevronUp, Pencil, Play } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Heart from '../Icon/Heart'
import Comment from '../Icon/Comment'
import { Avatar, AvatarImage } from '../ui/avatar'
import HashtagButton from '../Button/HashtagButton'
import { Button } from '../ui/button'

interface AlbumDetailProps {
  albumInfo: AlbumDetailInfo
  albumId: number
}

export default function AlbumDetailTop({
  albumInfo,
  albumId,
}: AlbumDetailProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const handlePlayClick = () => {
    navigate(`/album/play`, { state: albumId })
  }

  const truncatedDescription = useMemo(() => {
    if (albumInfo.description.length <= 100) return albumInfo.description
    return `${albumInfo.description.slice(0, 100)}...`
  }, [albumInfo.description])

  return (
    <div className="flex flex-col">
      <div className="w-[250px] h-full self-center" id="album-top-left">
        <div className="relative">
          <img
            src={albumInfo.albumCoverImage}
            alt={`${albumInfo.albumName}`}
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
      <div className="flex-col mt-2" id="album-info">
        <div className="text-2xl font-bold">{albumInfo.albumName}</div>

        <div className="mt-2 flex space-x-5 text-sm justify-between">
          <div>{albumInfo.createDate}</div>
          <div className="flex">
            <div className="px-1">{`${albumInfo.type} ㆍ`}</div>
            {albumInfo.genres.map((genre, index) => (
              <span key={index} className="text-gray-600">
                {genre}
                {index < albumInfo.genres.length - 1 && '/'}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center mt-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={albumInfo.profileImage} />
          </Avatar>
          <div className="flex-grow px-2">
            <h3 className="text-base font-semibold">{albumInfo.nickname}</h3>
          </div>
        </div>
      </div>
      <div className="mt-2 flex">
        <div className="flex flex-1 justify-start items-center">
          <button type="button" className="focus:outline-nonez-0">
            <Heart
              fill={albumInfo.isLike ? '#FFAF25' : '#ADADAD'}
              fillOpacity={albumInfo.isLike ? 1 : 0.4}
            />
          </button>
          <h3 className="px-1 text-base truncate">{albumInfo.like}</h3>
        </div>
        <div className="flex flex-1 items-center">
          <button type="button" className="focus:outline-nonez-0">
            <Comment />
          </button>
          <h3 className="px-1 text-base truncate">{albumInfo.commentCnt}</h3>
        </div>
      </div>
      <div className="mt-2" id="album-description">
        <div className="flex justify-between mt-2 items-center">
          <div className="text-xl font-semibold">앨범 소개</div>
          <div>
            <Pencil width={15} height={15}></Pencil>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-2">
          <p className="w-full text-sm text-gray-700">{truncatedDescription}</p>
          {albumInfo.description.length > 100 && (
            <Button
              variant={'ghost'}
              className="text-black"
              onClick={() => setShowModal(true)}
            >
              전체보기
            </Button>
          )}
          {/* {showModal && (

          )} */}
        </div>
      </div>
    </div>
  )
}
