import { AlbumDetailInfoType } from '@/types/album'
import { Pencil, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Comment from '../../Icon/Comment'
import Heart from '../../Icon/Heart'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../ui/alert-dialog'
import { Button } from '../../ui/button'
import AlbumCover from '../AlbumCover'
import AlbumUserProfile from './AlbumUserProfile'

interface AlbumDetailProps {
  albumInfo: AlbumDetailInfoType
  albumId: number
}

export default function AlbumDetailTop({
  albumInfo,
  albumId,
}: AlbumDetailProps) {
  const [showModal, setShowModal] = useState(false)

  const truncatedDescription = useMemo(() => {
    if (albumInfo.description.length <= 100) return albumInfo.description
    return `${albumInfo.description.slice(0, 100)}...`
  }, [albumInfo.description])

  return (
    <div className="flex flex-col">
      <div className="self-center">
        <AlbumCover
          width={250}
          albumId={albumId}
          src={albumInfo.albumCoverImage}
        />
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
        <AlbumUserProfile
          nickname={albumInfo.nickname}
          profileImage={albumInfo.profileImage}
        />
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
            <Comment fill={'none'} />
          </button>
          <h3 className="px-1 text-base truncate">{albumInfo.commentCnt}</h3>
        </div>
      </div>
      <div className="mt-10" id="album-description">
        <div className="flex justify-between mt-2 items-center">
          <div className="text-xl font-semibold">앨범 소개</div>
          <div>
            <Pencil width={15} height={15}></Pencil>
          </div>
        </div>
        <div className="flex text-[#A5A5A5] space-x-3">
          {albumInfo.hashtags.map((tag, index) => (
            <div key={index}>{`#${tag}`}</div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center mt-2">
          <p className="w-full text-sm text-gray-700">{truncatedDescription}</p>
          {albumInfo.description.length > 100 && (
            <Button
              variant={'ghost'}
              className="text-black"
              onClick={() => setShowModal(true)}
            >
              더보기
            </Button>
          )}
          <AlertDialog open={showModal} onOpenChange={setShowModal}>
            <AlertDialogContent className="max-h-[80vh] overflow-y-auto scrollbar-hide">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex justify-between">
                  <div>앨범 소개</div>
                  <div>
                    <X onClick={() => setShowModal(false)} />
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription className="whitespace-pre-wrap">
                  {albumInfo.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
