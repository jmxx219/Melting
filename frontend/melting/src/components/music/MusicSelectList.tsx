import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

import MusicList from './MusicList'
import { useState } from 'react'
import { Song } from '@/types/song'

export default function MusicSelectList() {
  const [songs, setSongs] = useState<Song[]>([
    { id: 1, title: 'Blueming', artist: '아이유', coverUrl: 'https://github.com/shadcn.png', isSelect: true },
    { id: 2, title: '좋은 날', artist: '아이유', coverUrl: 'https://github.com/shadcn.png' },
    { id: 3, title: '관계이 힘들어 (I stan U)', artist: '아이유', coverUrl: 'https://github.com/shadcn.png' },
  ])

  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs)
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-3">
      <form className="w-full">
        <div className="flex bg-[#F5F7FA] rounded-full p-1 mb-2">
          <Input
            type="text"
            placeholder="아이유"
            className="border-0 bg-inherit rounded-full"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            // className="flex-grow"
          />
          <Button type="submit" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-[#DCAA53]">* 곡을 선택하여 커버를 시작해보세요!</div>
      </form>
      <MusicList songs={filteredSongs} showNumbers={true} />
    </div>
  )
}
