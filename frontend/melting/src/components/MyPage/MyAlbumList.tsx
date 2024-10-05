import { useState, useEffect } from 'react'
import MyAlbumContent from '@/components/MyPage/MyAlbumContent'
import { AlbumMyPageResponseDto, AlbumMyResponseDto } from '@/types/user'
import { userApi } from '@/apis/userApi'
import { SortType, sort, ViewType, view } from '@/types/constType'

interface MyAlbumListProps {
  sortOption: SortType
  viewType: ViewType
}

export default function MyAlbumList({
  sortOption,
  viewType,
}: MyAlbumListProps) {
  const [albums, setAlbums] = useState<AlbumMyResponseDto[]>([])
  // const [isLast, setIsLast] = useState(false)
  // const [loading, setLoading] = useState(false)

  const fetchAlbums = async (page: number = 0) => {
    // setLoading(true)
    try {
      let response: AlbumMyPageResponseDto
      const sortParam = sortOption === sort.LATEST ? '0' : '1'

      setAlbums([])

      if (viewType === view.MY) {
        response = await userApi.getMemberAlbums(sortParam, page, 10)
      } else {
        response = await userApi.getMemberLikesAlbums(sortParam, page, 10)
      }

      if (response.albumInfoList) {
        setAlbums((prev) => [...prev, ...(response.albumInfoList ?? [])])
      }
      console.log(response.albumInfoList)
      // setIsLast(response.isLast || false)
    } catch (error) {
      console.error('앨범 목록 가져오기 실패:', error)
    } finally {
      // setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlbums(0)
  }, [sortOption, viewType])

  return (
    <div>
      <div className="album-list">
        {albums.map((album, index) => (
          <MyAlbumContent
            key={`${album.albumId}-${index}`}
            album={album}
            viewType={viewType}
            fetchAlbums={fetchAlbums}
          />
        ))}
      </div>
    </div>
  )
}
