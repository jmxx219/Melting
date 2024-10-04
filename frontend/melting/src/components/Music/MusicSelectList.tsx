/* eslint-disable @typescript-eslint/no-unused-vars */

import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { musicApi } from '@/apis/music/musicApi'
import MusicList from '@/components/Music/MusicList'
import { OriginalSongSearchResponseDto } from '@/typeApis/data-contracts'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MusicSelectList() {
  const [songs, setSongs] = useState<
    OriginalSongSearchResponseDto[] | undefined
  >([])
  const [keyword, setKeyword] = useState<string>('')
  const [page, setPage] = useState<number | undefined>(0)

  useEffect(() => {
    const fetchInitialSongs = async () => {
      const response = await musicApi.originSongList(keyword, page)
      setSongs(response.originalSongPage)
    }

    fetchInitialSongs()
  }, [keyword, page]) // 빈 배열을 넣으면 컴포넌트 마운트 시 한 번만 실행됨
  // @ts-ignore
  const [selectId, setSelectId] = useState<number | undefined>(-1)
  const navigate = useNavigate()

  const handleSongSelect = (songId: number | undefined) => {
    setSelectId(songId)
  }

  const recordClick = () => {
    navigate('/music/record', { state: { songId: selectId } })
  }

  return (
    <div className="flex flex-col items-center flex-1 w-full space-y-3">
      <form className="w-full">
        <div className="flex bg-[#F5F7FA] rounded-full p-1 mb-2">
          <Input
            type="text"
            placeholder="아이유"
            className="border-0 bg-inherit rounded-full"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
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
        songs={songs}
        showNumbers={true}
        selectId={selectId}
        onSelectSong={handleSongSelect}
        onSelectRecord={recordClick}
      />
    </div>
  )
}
