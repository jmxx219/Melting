/* eslint-disable @typescript-eslint/no-unused-vars */

import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

import MusicList from '@/components/Music/MusicList'
import { useState } from 'react'
import { Song } from '@/types/song'

export default function MusicSelectList() {
  // @ts-ignore
  const [songs, setSongs] = useState<Song[]>([
    {
      songId: 1,
      songTitle: 'Blueming',
      artist: '아이유',
      albumCoverImgUrl: 'https://github.com/shadcn.png',
    },
    {
      songId: 2,
      songTitle: '좋은 날',
      artist: '아이유',
      albumCoverImgUrl: 'https://github.com/shadcn.png',
    },
    {
      songId: 3,
      songTitle: '관계이 힘들어 (I stan U)',
      artist: '아이유',
      albumCoverImgUrl: 'https://github.com/shadcn.png',
    },
  ])
  const [selectId, setSelectId] = useState<number>(-1)
  // const [songs, setSongs] = useState<Song[]>()
  // @ts-ignore
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs)

  const handleSongSelect = (songId: number) => {
    setSelectId(songId)
  }
  return (
    <div className="flex flex-col items-center flex-1 w-full space-y-3">
      <form className="w-full">
        <div className="flex bg-[#F5F7FA] rounded-full p-1 mb-2">
          <Input
            type="text"
            placeholder="아이유"
            className="border-0 bg-inherit rounded-full"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.targest.value)}
            // className="flex-grow"
          />
          <Button type="submit" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-[#DCAA53]">
          * 곡을 선택하여 커버를 시작해보세요!
        </div>
      </form>
      <MusicList
        songs={filteredSongs}
        showNumbers={true}
        selectId={selectId}
        onSelectSong={handleSongSelect}
      />
    </div>
  )
}
