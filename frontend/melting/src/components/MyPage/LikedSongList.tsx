import { useState, useEffect, useCallback } from 'react'
import { userApi } from '@/apis/userApi'
import SongContent from '@/components/Common/SongContent'
import { SongLikesResponseDto } from '@/types/user'
import { Song } from '@/types/song'
import { SortType, sort } from '@/types/constType'
import InfiniteScroll from '@/components/Common/InfinityScroll.tsx'

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
    likedCount: songLikes.likedCount || 0,
    isLiked: songLikes.isLiked || false,
    lengthInSeconds: songLikes.lengthInSeconds,
    songUrl: '',
  }
}

const fetchLikedSongs = async (sortOption: SortType, page: number = 0) => {
  const sortParam = sortOption === sort.LATEST ? '0' : '1'
  try {
    const response = await userApi.getMemberLikesSongs(sortParam, page, 10)
    const newItems =
      response.songLikesList?.map(convertSongLikesResponseToSong) || []
    return { newItems, isLast: response.isLast }
  } catch (error) {
    console.error('좋아한 곡 목록 가져오기 실패:', error)
    return { newItems: [], isLast: true }
  }
}

export default function LikedSongList({ sortOption }: LikedSongListProps) {
  const [songs, setSongs] = useState<Song[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    const { newItems, isLast } = await fetchLikedSongs(sortOption, page)

    setSongs((prev) => [...prev, ...newItems])
    setHasMore(!isLast)
    setPage((prev) => prev + 1)
    setLoading(false)
  }, [loading, hasMore, page, sortOption])

  const updateSong = (songId: number, isLiked: boolean, likedCount: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.songId === songId ? { ...song, isLiked, likedCount } : song,
      ),
    )
  }

  useEffect(() => {
    setSongs([])
    setPage(0)
    setHasMore(true)
    loadMoreItems()
  }, [sortOption])

  return (
    <div>
      <InfiniteScroll
        loadMore={loadMoreItems}
        hasMore={hasMore}
        loading={loading}
      >
        {songs.map((song) => (
          <SongContent
            key={song.songId}
            song={song}
            updateSong={updateSong}
            hasProfileImage={true}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}
