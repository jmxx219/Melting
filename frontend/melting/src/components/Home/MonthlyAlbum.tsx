import { useEffect, useState } from 'react'
import { format, subMonths } from 'date-fns'

import { BestAlbum } from '@/types/album'
import Album from '../Community/Album'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

const albums: BestAlbum[] = [
  {
    albumId: 1,
    albumName: '월별 첫 번째 앨범',
    nickname: '아티스트1',
    albumCoverImage: '/images/mockup/album3.png',
  },
  {
    albumId: 2,
    albumName: '월별 두 번째 앨범',
    nickname: '아티스트2',
    albumCoverImage: '/images/mockup/album4.png',
  },
  {
    albumId: 3,
    albumName: '월별 세 번째 앨범',
    nickname: '아티스트3',
    albumCoverImage: '/images/mockup/album5.png',
  },
]

export function getPreviousMonth(date: Date = new Date()): string {
  const prevMonth = subMonths(date, 1)
  const monthNumber = format(prevMonth, 'M')
  return monthNumber.length === 1 ? monthNumber : monthNumber.replace(/^0/, '')
}

export default function MonthlyAlbum() {
  const [monthlyAlbums, setMonthlyAlbums] = useState<BestAlbum[]>([])
  const prevMonth = getPreviousMonth()

  useEffect(() => {
    setMonthlyAlbums(albums)
  })

  return (
    <>
      <div className="flex flex-row text-2xl font-bold mb-2">
        <div className="text-primary-400">{prevMonth}월</div>의 앨범
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-0">
          {monthlyAlbums.map((album) => (
            <Album key={album.albumId} album={album} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}
