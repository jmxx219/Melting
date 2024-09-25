import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Heart from '@/components/icon/Heart'
import { Play, Crown } from 'lucide-react'

interface LikedSongProps {
  song: {
    songId: number
    albumCoverImgUrl: string
    artist: string
    songTitle: string
    nickname: string
    executionTime: string
    likeCount: number
    isLiked: boolean
    songOrder?: number
    isTitle?: boolean
  }
  hasProfileImage?: boolean
}

export default function SongContent({ song, hasProfileImage }: LikedSongProps) {
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(song.isLiked)

  const toggleLike = () => {
    setIsLiked(!isLiked)
    // TODO: 좋아요 상태 업데이트 API 호출
  }

  const goToPlaySong = (songId: number) => {
    // TODO: 곡 재생 화면으로 이동
    navigate(`/music/play/${songId}`)
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  return (
    <div className="flex items-center mb-4 gap-3">
      {hasProfileImage ? (
        <img
          src={song.albumCoverImgUrl}
          alt={song.songTitle}
          className="w-12 h-12 object-cover rounded-full"
        />
      ) : song.songOrder !== undefined ? (
        <div className="w-6 h-6 flex items-center justify-center text-base">
          {song.songOrder}
        </div>
      ) : null}

      <div className="flex-1 flex flex-col justify-around h-12">
        <div className="font-bold text-sm flex items-center">
          {song.isTitle && <Crown size={16} className="text-yellow-400 mr-2" />}
          {truncateText(song.songTitle, 13)}
        </div>
        <div className="text-xs text-gray-500">{song.nickname}</div>
      </div>

      <div className="text-sm flex items-center w-14">
        <button type="button" onClick={() => toggleLike()}>
          <Heart fill={'#FFAF25'} fillOpacity={1} />
        </button>
        <div className="ml-1">
          {song.likeCount > 999 ? '999+' : song.likeCount.toLocaleString()}
        </div>
      </div>

      <div className="text-xs flex items-center w-12 text-gray-400">
        <button type="button" onClick={() => goToPlaySong(song.songId)}>
          <Play size={20} className="text-primary-400 fill-primary-400" />
        </button>
        <div className="ml-1">{song.executionTime}</div>
      </div>
    </div>
  )
}
