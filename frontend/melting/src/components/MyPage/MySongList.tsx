import { useState, useEffect, useCallback } from 'react'
import MySongContent from '@/components/MyPage/MySongContent'
import { SortType } from '@/types/constType'
import { SongListDto } from '@/types/user'
import { userApi } from '@/apis/userApi'
import InfiniteScroll from '@/components/Common/InfinityScroll.tsx'

interface AlbumSongToggleProps {
  sortOption: SortType
}

const fetchMySongs = async (page: number = 0, pageSize: number = 10) => {
  try {
    const response = await userApi.getMemberSongs(page, pageSize)
    return {
      newItems: response.mySongList ?? [],
      isLast: response.isLast ?? true,
    }
  } catch (error) {
    console.error('Error fetching songs:', error)
    return { newItems: [], isLast: true }
  }
}

export default function MySongList({ sortOption }: AlbumSongToggleProps) {
  const [originalSongs, setOriginalSongs] = useState<SongListDto[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    const { newItems, isLast } = await fetchMySongs(page)

    setOriginalSongs((prev) => [...prev, ...newItems])
    setHasMore(!isLast)
    setPage((prev) => prev + 1)
    setLoading(false)
  }, [loading, hasMore, page])

  useEffect(() => {
    setOriginalSongs([])
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
        {originalSongs.map((originalSong) => (
          <MySongContent
            key={originalSong.originalSongId}
            originalSong={originalSong}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}
