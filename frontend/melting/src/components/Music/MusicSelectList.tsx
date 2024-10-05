import { musicApi } from '@/apis/music/musicApi'
import { Search } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import OriginalSongCard from './OriginalSongCard'
import { OriginalSongSearchResponseDto } from '@/types/song'

export default function MusicSelectList() {
  const [songs, setSongs] = useState<OriginalSongSearchResponseDto[]>([])
  const [keyword, setKeyword] = useState<string>('') // 검색어
  const [page, setPage] = useState<number>(0) // 페이지 번호
  const [hasMore, setHasMore] = useState<boolean>(true) // 더 많은 데이터가 있는지 확인
  const [loading, setLoading] = useState<boolean>(false) // 로딩 상태 관리

  const observerRef = useRef<HTMLDivElement>(null) // 관찰 대상 요소에 대한 ref

  // 곡 목록을 가져오는 함수
  const fetchSongs = async (pageNum: number, searchKeyword: string) => {
    if (loading || !hasMore) return // 이미 로딩 중이거나 더 가져올 데이터가 없으면 중지
    setLoading(true)

    try {
      const response = await musicApi.originSongList(searchKeyword, pageNum)
      const newSongs = response.originalSongPage

      if (response.isLast) {
        setHasMore(false) // 더 이상 가져올 데이터가 없으면 hasMore를 false로 설정
      } else {
        setSongs((prevSongs) => [...prevSongs, ...newSongs]) // 기존 곡 목록에 추가
      }
    } catch (error) {
      console.error('Error fetching songs:', error)
    } finally {
      setLoading(false) // 로딩 완료
    }
  }

  // 페이지 첫 로드 시 데이터를 한 번 가져옴 (page가 0이어도 호출)
  useEffect(() => {
    setSongs([]) // 검색어가 변경될 때 기존 데이터를 초기화
    setHasMore(true) // 새로운 검색어로 더 많은 데이터 가능성 확인
    setPage(0) // 페이지 번호 초기화
    fetchSongs(0, keyword) // 첫 페이지 데이터 로드
  }, [keyword])

  // 페이지가 변경될 때마다 추가로 곡 데이터를 요청
  useEffect(() => {
    if (page > 0) {
      fetchSongs(page, keyword)
    }
  }, [page, keyword])

  // IntersectionObserver 콜백 함수 (마지막 요소가 보이면 페이지 증가)
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1) // 페이지를 증가시켜 추가 데이터 요청
      }
    },
    [hasMore, loading],
  )

  // observer 설정 및 마지막 요소 감지
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null, // viewport 기준
      rootMargin: '100px', // 관찰 대상이 화면에 들어오기 100px 전에 미리 로드
      threshold: 0, // 관찰 대상이 0% 보이기 시작할 때 트리거
    })

    const currentObserver = observerRef.current
    if (currentObserver) observer.observe(currentObserver)

    return () => {
      if (currentObserver) observer.unobserve(currentObserver)
    }
  }, [observerCallback])

  const [selectId, setSelectId] = useState<number>(-1) // 선택된 곡 ID 관리
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
            placeholder="곡명, 가수명을 입력하세요"
            className="border-0 bg-inherit rounded-full"
            onChange={(e) => {
              setKeyword(e.target.value)
              setSongs([]) // 검색어 변경 시 기존 데이터를 초기화
              setPage(0) // 페이지 번호를 0으로 초기화
              setHasMore(true) // 새로운 검색어에 대한 더 많은 데이터 가능성 확인
            }}
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
      {/* 곡이 없는 경우 메시지 표시 */}
      {!songs || songs.length === 0 ? (
        <div className="w-full h-full flex items-center flex-1 justify-center">
          <p className="text-[#A5A5A5]">검색한 곡이 없습니다.</p>
        </div>
      ) : (
        <div className="flex-1 overflow-auto w-full">
          <div className="grid grid-cols-1 gap-1">
            {songs.map((song, index) => (
              <OriginalSongCard
                key={song.originalSongId}
                song={song}
                isSelect={selectId === song.originalSongId}
                onSelectRecord={recordClick}
                onSelectSong={handleSongSelect}
                index={index}
              />
            ))}
          </div>
          {/* 마지막 요소에 대한 ref 연결 */}
          {hasMore && <div ref={observerRef} className="loader h-10"></div>}
        </div>
      )}
    </div>
  )
}
