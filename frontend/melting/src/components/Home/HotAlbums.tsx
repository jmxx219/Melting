import { useEffect, useState } from 'react'

import { AlbumRankingResponseDto } from '@/types/album'
import Album from '../Community/Album'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { albumApi } from '@/apis/albumApi.ts'

export default function HotAlbum() {
  const [hotAlbums, setHotAlbums] = useState<AlbumRankingResponseDto[]>([])
  const [loading, setLoading] = useState<boolean>(true) // 로딩 상태 관리
  const [error, setError] = useState<string | null>(null) // 에러 상태 관리

  useEffect(() => {
    const fetchSteadyAlbums = async () => {
      try {
        const response = await albumApi.getHot5Albums()
        setHotAlbums(response)
      } catch (err) {
        console.error(err)
        setError('앨범을 불러오는 데 오류가 발생했습니다.') // 에러 메시지 설정
      } finally {
        setLoading(false) // 로딩 상태 false로 설정
      }
    }

    fetchSteadyAlbums() // 함수 호출
  }, [])

  if (error) {
    return <div>{error}</div> // 에러 발생 시 표시할 내용
  }

  return (
    <>
      <div className="flex flex-row text-2xl font-bold mb-2">
        <div className="text-primary-400">HOT 5</div>&nbsp;앨범
      </div>
      {loading || hotAlbums.length === 0 ? (
        <ScrollArea className="w-full h-[196px] whitespace-nowrap rounded-md">
          <div className="flex items-center justify-center py-20">
            로딩 중...
          </div>
        </ScrollArea>
      ) : (
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex space-x-0">
            {hotAlbums.map((album) => (
              <Album key={album.albumId} album={album} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </>
  )
}
