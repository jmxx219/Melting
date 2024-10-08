import { useState, useEffect, useCallback } from 'react'
import MyAlbumContent from '@/components/MyPage/MyAlbumContent'
import { AlbumMyPageResponseDto, AlbumMyResponseDto } from '@/types/user'
import { userApi } from '@/apis/userApi'
import { SortType, sort, ViewType, view } from '@/types/constType'
import InfiniteScroll from '@/components/Common/InfinityScroll.tsx'

interface MyAlbumListProps {
  sortOption: SortType
  viewType: ViewType
}

const fetchAlbums = async (
  sortOption: SortType,
  viewType: ViewType,
  page: number = 0,
) => {
  try {
    let response: AlbumMyPageResponseDto
    const sortParam = sortOption === sort.LATEST ? '0' : '1'

    if (viewType === view.MY) {
      response = await userApi.getMemberAlbums(sortParam, page, 10)
    } else {
      response = await userApi.getMemberLikesAlbums(sortParam, page, 10)
    }

    return {
      newItems: response.albumInfoList ?? [],
      isLast: response.isLast, // 마지막 페이지 확인
    }
  } catch (error) {
    console.error('앨범 목록 가져오기 실패:', error)
    return { newItems: [], isLast: true }
  }
}

export default function MyAlbumList({
  sortOption,
  viewType,
}: MyAlbumListProps) {
  const [albums, setAlbums] = useState<AlbumMyResponseDto[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    const { newItems, isLast } = await fetchAlbums(sortOption, viewType, page)

    setAlbums((prev) => {
      const updatedResults = [...prev, ...newItems]
      return updatedResults
    })

    setHasMore(!isLast)
    setPage((prev) => prev + 1)
    setLoading(false)
  }, [loading, hasMore, page, sortOption, viewType])

  const updateAlbum = (
    albumId: number,
    isLiked: boolean,
    likedCount: number,
  ) => {
    setAlbums((prevAlbums) =>
      prevAlbums.map((album) =>
        album.albumId === albumId ? { ...album, isLiked, likedCount } : album,
      ),
    )
  }

  const deleteAlbum = (albumId: number) => {
    setAlbums((prevAlbums) =>
      prevAlbums.filter((album) => album.albumId !== albumId),
    )
  }

  useEffect(() => {
    const loadInitialAlbums = async () => {
      setAlbums([])
      setPage(0)
      setHasMore(true)
      setLoading(true)

      const { newItems, isLast } = await fetchAlbums(sortOption, viewType, 0)

      setAlbums(newItems)
      setHasMore(!isLast)
      setLoading(false)
    }

    loadInitialAlbums()
  }, [sortOption, viewType])

  return (
    <div>
      <InfiniteScroll
        loadMore={loadMoreItems}
        hasMore={hasMore}
        loading={loading}
      >
        <div className="album-list">
          {albums.map((album, index) => (
            <MyAlbumContent
              key={`${album.albumId}-${index}`}
              album={album}
              viewType={viewType}
              updateAlbum={updateAlbum}
              onDelete={deleteAlbum}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}
