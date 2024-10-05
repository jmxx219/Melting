import { useState, useEffect } from 'react'
import { userApi } from '@/apis/userApi'
import SongContent from '@/components/Common/SongContent'
import { SongLikesResponseDto } from '@/types/user'
import { Song } from '@/types/song'
import { SortType, sort } from '@/types/constType'

interface LikedSongListProps {
  sortOption: SortType
}

const convertSongLikesResponseToSong = (
  songLikes: SongLikesResponseDto,
): Song => {
  return {
    songId: songLikes.songId || 0,
    songTitle: songLikes.title || '',
    artist: songLikes.artist || '',
    albumCoverImageUrl: songLikes.albumCoverImageUrl || '',
    nickname: songLikes.creatorNickname || '',
    likeCount: songLikes.likedCount || 0,
    isLiked: songLikes.isLiked || false,
    lengthInSeconds: songLikes.lengthInSeconds || 0,
  }
}

export default function LikedSongList({ sortOption }: LikedSongListProps) {
  const [songs, setSongs] = useState<Song[]>([])
  // const [isLast, setIsLast] = useState(false)
  // const [loading, setLoading] = useState(false)

  const fetchLikedSongs = async (page: number = 0) => {
    // setLoading(true)
    try {
      setSongs([])
      const sortParam = sortOption === sort.LATEST ? '0' : '1'
      const response = await userApi.getMemberLikesSongs(sortParam, page, 10)

      if (response.songLikesList) {
        const convertedSongs = response.songLikesList.map(
          convertSongLikesResponseToSong,
        )
        setSongs((prev) => [...prev, ...convertedSongs])
      }

      // setIsLast(response.isLast || false)
    } catch (error) {
      console.error('좋아한 곡 목록 가져오기 실패:', error)
    } finally {
      // setLoading(false)
    }
  }

  useEffect(() => {
    fetchLikedSongs()
  }, [sortOption])

  return (
    <div>
      {songs.map((song) => (
        <SongContent
          key={song.songId}
          song={song}
          fetchSongs={fetchLikedSongs}
          hasProfileImage={true}
        />
      ))}
    </div>
  )
}
