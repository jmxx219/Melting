import { useState, useEffect } from 'react'
import MyAlbumContent from '@/components/MyPage/MyAlbumContent'
import { AlbumMyPageResponseDto, AlbumMyResponseDto } from '@/types/user'
import { userApi } from '@/apis/userApi'

interface MyAlbumListProps {
  sortOption: 'LATEST' | 'POPULAR'
  viewType: 'my' | 'liked'
}

export default function MyAlbumList({ viewType }: MyAlbumListProps) {
  const [albums, setAlbums] = useState<AlbumMyResponseDto[]>([])
  const [pageNumber, setPageNumber] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLast, setIsLast] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchAlbums = async (page: number) => {
    setLoading(true)
    try {
      let response: AlbumMyPageResponseDto

      if (viewType === 'my') {
        response = await userApi.getMemberAlbums()
      } else {
        response = await userApi.getMemberLikesAlbums()
      }

      if (response.albumInfoList) {
        setAlbums((prev) => [...prev, ...(response.albumInfoList ?? [])])
      }

      console.log(response)

      setPageNumber(response.pageNumber || 0)
      setTotalPages(response.totalPages || 0)
      setIsLast(response.isLast || false)
    } catch (error) {
      console.error('앨범 목록 가져오기 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlbums(0)
  }, [viewType])

  return (
    <div>
      <div className="album-list">
        {albums.map((album) => (
          <MyAlbumContent
            key={album.albumId}
            album={album}
            viewType={viewType}
          />
        ))}
      </div>
    </div>
  )
}
