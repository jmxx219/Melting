import { useState, useEffect, useRef, useCallback } from 'react'
import MyAlbumContent from '@/components/MyPage/MyAlbumContent'
import { AlbumMyPageResponseDto, AlbumMyResponseDto } from '@/types/user'
import { userApi } from '@/apis/userApi'

interface MyAlbumListProps {
  sortOption: 'LATEST' | 'POPULAR'
  viewType: 'my' | 'liked'
}

export default function MyAlbumList({ viewType }: MyAlbumListProps) {
  const [albums, setAlbums] = useState<AlbumMyResponseDto[]>([])
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
      console.log(response.albumInfoList)
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
        {albums.map((album, index) => (
          <MyAlbumContent
            key={`${album.albumId}-${index}`}
            album={album}
            viewType={viewType}
          />
        ))}
      </div>
    </div>
  )
}
