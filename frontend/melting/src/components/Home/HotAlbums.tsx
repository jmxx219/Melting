import { useEffect, useState } from 'react'

import { BestAlbum } from '@/types/album'
import Album from '../Community/Album'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

const albums: BestAlbum[] = [
  {
    albumId: 1,
    albumName: '월별 첫 번째 앨범',
    nickname: '아티스트1',
    albumCoverImage: '/images/mockup/album6.png',
  },
  {
    albumId: 2,
    albumName: '월별 두 번째 앨범',
    nickname: '아티스트2',
    albumCoverImage: '/images/mockup/album7.png',
  },
  {
    albumId: 3,
    albumName: '월별 세 번째 앨범',
    nickname: '아티스트3',
    albumCoverImage: '/images/mockup/album8.png',
  },
]

export default function HotAlbum() {
  const [hotAlbums, setHotAlbums] = useState<BestAlbum[]>([])

  useEffect(() => {
    setHotAlbums(albums)
  })

  return (
    <>
      <div className="flex flex-row text-2xl font-bold mb-2">
        <div className="text-primary-400">HOT 5</div>&nbsp;앨범
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-0">
          {hotAlbums.map((album) => (
            <Album key={album.albumId} album={album} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}
