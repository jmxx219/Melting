/* eslint-disable @typescript-eslint/no-unused-vars */

import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

import MusicList from '@/components/Music/MusicList'
import { Song } from '@/types/song'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAxiosInstance } from '@/apis/axiosInstance'

export default function MusicSelectList() {
  const [keyword, setKeyword] = useState<string>('')
  const [page, setPage] = useState<number>(0)
  const axiosInstance = createAxiosInstance('originalSongs')

  useEffect(() => {
    const fetchInitialSongs = async () => {
      try {
        const response = await axiosInstance.get(
          `?keyword=${encodeURIComponent(keyword)}&page=${page}&size=10`,
        )

        console.log(response)

        // setSongs(response.data.content) // 초기 API 응답 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching initial songs:', error)
      }
    }

    fetchInitialSongs()
  }, []) // 빈 배열을 넣으면 컴포넌트 마운트 시 한 번만 실행됨

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axiosInstance.get('', {
        params: {
          // 쿼리 파라미터는 params 안에 넣어야 함
          keyword: keyword, // 검색어
          page: 0, // 페이지 번호
          size: 10, // 페이지 크기
        },
      })

      // API 응답 데이터를 상태에 저장
      setSongs(response.data.content) // response.data.content는 API 응답에 따라 변경될 수 있음
    } catch (error) {
      console.error('Error fetching songs:', error)
    }
  }
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
  const navigate = useNavigate()

  const handleSongSelect = (songId: number) => {
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
