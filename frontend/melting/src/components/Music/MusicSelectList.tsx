import { musicApi } from '@/apis/music/musicApi'
import { OriginalSongSearchResponseDto } from '@/types/song'
import { Search } from 'lucide-react'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import OriginalSongCard from './OriginalSongCard'

export default function MusicSelectList() {
  const [songs, setSongs] = useState<OriginalSongSearchResponseDto[]>([])
  const [keyword, setKeyword] = useState<string>('')
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const fetchSongs = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const response = await musicApi.originSongList(keyword, page)
      const newSongs = response.originalSongPage

      if (newSongs.length === 0) {
        setHasMore(false)
      } else {
        setSongs((prevSongs) => [...prevSongs, ...newSongs])
        setPage((prevPage) => prevPage + 1)
      }
    } catch (error) {
      console.error('Error fetching songs:', error)
    } finally {
      setLoading(false)
    }
  }, [keyword, page, loading, hasMore])

  const resetSearch = useCallback(() => {
    setSongs([])
    setPage(0)
    setHasMore(true)
  }, [])

  useEffect(() => {
    resetSearch()
    fetchSongs()
  }, [keyword])

  const lastSongRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      if (observerRef.current) observerRef.current.disconnect()
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchSongs()
        }
      })
      if (node) observerRef.current.observe(node)
    },
    [loading, hasMore, fetchSongs],
  )

  const [selectId, setSelectId] = useState<number>(-1)
  const navigate = useNavigate()

  const handleSongSelect = (songId: number) => {
    setSelectId(songId)
  }

  const recordClick = () => {
    navigate('/music/record', { state: { songId: selectId } })
  }

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    resetSearch()
    fetchSongs()
  }

  return (
    <div className="flex flex-col items-center flex-1 w-full space-y-3">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex bg-[#F5F7FA] rounded-full p-1 mb-2">
          <Input
            type="text"
            placeholder="곡, 가수명을 입력하세요"
            className="border-0 bg-inherit rounded-full"
            onChange={handleKeywordChange}
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
      {!songs || songs.length === 0 ? (
        <div className="w-full h-full flex items-center flex-1 justify-center">
          <p className="text-[#A5A5A5]">검색한 곡이 없습니다.</p>
        </div>
      ) : (
        <div className="w-full">
          {songs.map((song, index) => (
            <div
              key={song.originalSongId}
              ref={index === songs.length - 1 ? lastSongRef : null}
            >
              <OriginalSongCard
                song={song}
                isSelect={selectId === song.originalSongId}
                onSelectRecord={recordClick}
                onSelectSong={handleSongSelect}
                index={index}
              />
            </div>
          ))}
        </div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  )
}
