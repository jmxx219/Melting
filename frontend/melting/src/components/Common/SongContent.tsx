import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Heart from '@/components/Icon/Heart'
import { Play, Crown } from 'lucide-react'
import { Song } from '@/types/song'
import { convertSecondsToMinutes } from '@/utils/timeUtil'

interface LikedSongProps {
  song: Song
  hasProfileImage?: boolean
  songOrder?: number
  isTitle?: boolean
}

export default function SongContent({
  song,
  hasProfileImage,
  songOrder = 0,
  isTitle,
}: LikedSongProps) {
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(song.isLiked)

  const toggleLike = () => {
    setIsLiked(!isLiked)
    // TODO: 좋아요 상태 업데이트 API 호출
  }

  const goToPlaySong = (songId: number) => {
    navigate(`/music/play/`, { state: songId })
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  return (
    <div className="flex items-center mb-4 gap-3">
      {hasProfileImage ? (
        <img
          src={song.albumCoverImageUrl}
          alt={song.songTitle}
          className="w-12 h-12 object-cover rounded-full"
        />
      ) : songOrder !== 0 ? (
        <div className="w-6 h-6 flex items-center justify-center text-base">
          {songOrder}
        </div>
      ) : null}

      <div className="flex-1 flex flex-col justify-around h-12">
        <div className="font-bold text-sm flex items-center">
          {isTitle && (
            <Crown
              fill={'#FFAF25'}
              strokeWidth={0}
              size={16}
              className="text-primary-400 mr-2"
            />
          )}
          {truncateText(song.songTitle, 13)}
        </div>
        <div className="text-xs text-gray-500">{song.nickname}</div>
      </div>

      <div className="text-sm flex items-center w-14">
        <button type="button" onClick={() => toggleLike()}>
          <Heart fill={'#FFAF25'} fillOpacity={1} />
        </button>
        <div className="ml-1">
          {song.likeCount !== undefined && song.likeCount !== null
            ? song.likeCount > 999
              ? '999+'
              : song.likeCount.toLocaleString()
            : '0'}
        </div>
      </div>

      <div className="text-xs flex items-center w-12 text-gray-400">
        <button type="button" onClick={() => goToPlaySong(song.songId)}>
          <Play size={20} className="text-primary-400 fill-primary-400" />
        </button>
        <div className="ml-1">
          {convertSecondsToMinutes(song.lengthInSeconds || 0)}
        </div>
      </div>
    </div>
  )
}
