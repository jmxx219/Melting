import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SongItem from '@/components/Music/SongItem'

import { Song } from '@/types/music'
import SearchBar from '../Music/SearchBar'

export default function SongSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Song[]>([])
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([])
  const navigate = useNavigate()

  const handleSearch = async () => {
    // TODO: Implement API call to search for cover songs
    // For now, we'll use mock data
    const mockResults: Song[] = [
      {
        song_id: 1,
        album_cover_img_url: '/api/placeholder/50/50',
        song_title: '좋은 날',
        nickname: '쏠랑쏠랑',
        artist: 'IU',
        song_type: 'melting',
      },
      {
        song_id: 2,
        album_cover_img_url: '/api/placeholder/50/50',
        song_title: '좋은 하루는 바다',
        nickname: '쏠랑쏠랑',
        artist: '윤하',
        song_type: 'ai',
      },
      {
        song_id: 3,
        album_cover_img_url: '/api/placeholder/50/50',
        song_title: '좋은 아침',
        nickname: '쏠랑쏠랑',
        artist: 'IU',
        song_type: 'melting',
      },
    ]
    setSearchResults(mockResults)
  }

  const handleSelectSong = (song: Song) => {
    const isSelected = selectedSongs.some((s) => s.song_id === song.song_id)

    if (isSelected) {
      setSelectedSongs(selectedSongs.filter((s) => s.song_id !== song.song_id))
    } else {
      const songInSearchResults = searchResults.find(
        (s) => s.song_id === song.song_id,
      )
      if (songInSearchResults) {
        setSelectedSongs([...selectedSongs, songInSearchResults])
      }
    }
  }

  const handleTypeChange = (songId: number, type: 'melting' | 'ai') => {
    setSearchResults(
      searchResults.map((song) =>
        song.song_id === songId ? { ...song, song_type: type } : song,
      ),
    )

    setSelectedSongs(
      selectedSongs.map((song) =>
        song.song_id === songId ? { ...song, song_type: type } : song,
      ),
    )
  }

  const handleSubmit = () => {
    // TODO: Pass selected songs back to SongSelection component
    navigate('/album/create')
  }

  return (
    <div className="space-y-4 p-4">
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
              key={song.song_id}
              {...song}
              isSelected={selectedSongs.some((s) => s.song_id === song.song_id)}
              onSelect={() => handleSelectSong(song)}
              onTypeChange={(value) => handleTypeChange(song.song_id, value)}
              showTypeSelect
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">검색한 곡이 없습니다</p>
      )}

      <div className="text-sm text-primary-500 space-y-1">
        <p>※ 음표(♪)를 클릭하여 곡을 추가/삭제할 수 있습니다.</p>
        <p>※ 선택한 곡은 아래서 확인 가능합니다.</p>
        <p>※ 곡은 최소 1곡에서 최대 10곡까지 등록할 수 있습니다.</p>
      </div>

      <div className="flex items-center justify-center">
        <ArrowDown size={60} className="text-gray-300 my-8" />
      </div>

      <div className="space-y-2 ">
        <span className="flex items-center font-semibold">
          선택한 곡
          <p className="ml-2 text-xs text-gray">{selectedSongs.length}/10</p>
        </span>
        {selectedSongs.length === 0 ? (
          <div className="border border-gray w-full p-5 text-center">
            <p className="text-gray">나의 곡을 검색하여 선택해주세요</p>
          </div>
        ) : (
          selectedSongs.map((song) => (
            <SongItem
              key={song.song_id}
              {...song}
              isSelected={true}
              onSelect={() => handleSelectSong(song)}
              onTypeChange={(value) => handleTypeChange(song.song_id, value)}
              showTypeSelect
            />
          ))
        )}
      </div>

      <Button
        variant={'destructive'}
        onClick={handleSubmit}
        disabled={selectedSongs.length === 0 || selectedSongs.length > 10}
        className="w-full rounded-full h-14"
      >
        곡 등록하기
      </Button>
    </div>
  )
}
