import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import SongItem from '@/components/Music/SongItem'
import { useAlbumContext } from '@/contexts/AlbumContext'
import { Song } from '@/types/song'
import { CoverType } from '@/types/constType'
import SearchBar from '../Music/SearchBar'
import MusicNote from '../Icon/MusicNote'

const mockResults: Song[] = Array.from({ length: 30 }, (_, index) => ({
  songId: index + 1,
  albumCoverImgUrl: '/api/placeholder/50/50',
  songTitle: `곡 제목 ${index + 1}`,
  nickname: '쏠랑쏠랑',
  artist: `아티스트 ${index + 1}`,
  songType: 'melting' as CoverType,
}))

export default function SongSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Song[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isFetching, setIsFetching] = useState(false)

  const { selectedSongs, setSelectedSongs } = useAlbumContext()
  const navigate = useNavigate()

  // API 대체 목업 데이터 로딩
  const loadMoreSongs = () => {
    if (isFetching) return // 이미 페칭 중일 때 중복 요청 방지
    setIsFetching(true)
    // 실제 API 요청 대신 페이지에 맞는 데이터를 가져옵니다
    const newResults = mockResults.slice(
      (currentPage - 1) * 10,
      currentPage * 10,
    )
    setSearchResults((prev) => [...prev, ...newResults])
    setCurrentPage((prev) => prev + 1)
    setIsFetching(false)
  }

  // 무한 스크롤 감지
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      loadMoreSongs()
    }
  }

  useEffect(() => {
    // 초기 데이터 로딩
    loadMoreSongs()
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSearch = async () => {
    // TODO: Implement API call to search for cover songs
    // For now, we'll use mock data (reset the page)
    setCurrentPage(1)
    setSearchResults(mockResults.slice(0, 10))
  }

  const handleSelectSong = (song: Song) => {
    const isSelected = selectedSongs.some((s) => s.songId === song.songId)

    if (isSelected) {
      setSelectedSongs(selectedSongs.filter((s) => s.songId !== song.songId))
    } else {
      const songInSearchResults = searchResults.find(
        (s) => s.songId === song.songId,
      )
      if (songInSearchResults) {
        setSelectedSongs([...selectedSongs, songInSearchResults])
      }
    }
  }

  const handleTypeChange = (songId: number, type: CoverType) => {
    setSearchResults(
      searchResults.map((song) =>
        song.songId === songId ? { ...song, song_type: type } : song,
      ),
    )

    setSelectedSongs(
      selectedSongs.map((song) =>
        song.songId === songId ? { ...song, song_type: type } : song,
      ),
    )
  }

  const handleSubmit = () => {
    navigate('/album/create')
  }

  return (
    <div className="flex flex-col justify-between flex-1 space-y-6 p-4">
      <div className="flex items-center space-x-2">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          placeholderText="나의 곡을 검색하세요"
        />
      </div>

      {searchResults.length > 0 ? (
        <div className="space-y-2">
          {searchResults.map((song) => (
            <SongItem
              key={`${song.songId}-${song.songType}`}
              {...song}
              isSelected={selectedSongs.some((s) => s.songId === song.songId)}
              onSelect={() => handleSelectSong(song)}
              onTypeChange={(value) => handleTypeChange(song.songId, value)}
              showTypeSelect
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-left">검색한 곡이 없습니다</p>
      )}

      <div className="text-sm text-primary-500 space-y-1">
        <p className="flex items-center">
          ※ 음표(
          <MusicNote width={15} height={15} fill="#adadad" />
          )를 클릭하여 곡을 추가/삭제할 수 있습니다.
        </p>
        <p>
          ※ 선택한 곡(
          <MusicNote width={15} height={15} fill="#da961f" />
          )은 아래서 확인 가능합니다.
        </p>
        <p>※ 곡은 최소 1곡에서 최대 10곡까지 등록할 수 있습니다.</p>
      </div>

      <div className="flex items-center justify-center">
        <ArrowDown size={60} className="text-gray-300 my-8" />
      </div>

      <div className="space-y-2 ">
        <span className="flex items-center font-semibold">
          선택한 곡
          <p
            className={`ml-2 text-xs ${selectedSongs.length > 10 ? 'text-status-warning' : 'text-gray'}`}
          >
            {selectedSongs.length}/10
          </p>
        </span>
        {selectedSongs.length === 0 ? (
          <div className="border border-gray w-full p-5 text-center">
            <p className="text-gray">나의 곡을 검색하여 선택해주세요</p>
          </div>
        ) : (
          selectedSongs.map((song) => (
            <SongItem
              key={`${song.songId}-${song.songType}`}
              {...song}
              isSelected={true}
              onSelect={() => handleSelectSong(song)}
              onTypeChange={(value) => handleTypeChange(song.songId, value)}
              showTypeSelect
            />
          ))
        )}
      </div>

      <Button
        type="button"
        variant={selectedSongs.length === 0 ? 'gray' : 'destructive'}
        onClick={handleSubmit}
        disabled={selectedSongs.length === 0 || selectedSongs.length > 10}
        className="w-full rounded-full h-14"
      >
        곡 등록하기
      </Button>
    </div>
  )
}
