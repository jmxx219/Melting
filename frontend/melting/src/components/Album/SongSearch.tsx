import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import SongItem from '@/components/Music/SongItem'
import { useAlbumContext } from '@/contexts/AlbumContext'
import {
  Song,
  SongSearchPageResponseDto,
  SongSearchResponseDto,
} from '@/types/song'
import { CoverType } from '@/types/constType'
import SearchBar from '../Music/SearchBar'
import MusicNote from '../Icon/MusicNote'
import { songApi } from '@/apis/songApi'

const convertSongDtoToSong = (item: SongSearchResponseDto): Song => {
  // 두 속성 중 하나가 반드시 존재한다는 가정하에 assertion 사용
  const songId = item.meltingSongId || item.aiCoverSongId!
  return {
    songId: songId as number, // Type assertion을 사용하여 songId를 number로 단언
    albumCoverImageUrl: item.albumCoverImage || '',
    songTitle: item.originalSongTitle || '',
    nickname: 'Artist',
    artist: item.originalSongArtist || '',
    songType: item.meltingSongId ? 'melting' : 'ai',
    meltingSongId: item.meltingSongId || null,
    aiCoverSongId: item.aiCoverSongId || null,
  }
}

const fetchSongs = async (searchTerm: string, page: number) => {
  try {
    const response: SongSearchPageResponseDto =
      await songApi.getSongsForAlbumCreation(searchTerm, page, 10)
    const newItems =
      response.songSearchResponseDtoList?.map(convertSongDtoToSong) || []
    return { newItems, isLast: response.isLast }
  } catch (error) {
    console.error('Failed to load songs:', error)
    return { newItems: [], isLast: true }
  }
}

export default function SongSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Song[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { selectedSongs, setSelectedSongs } = useAlbumContext()
  const navigate = useNavigate()

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    const { newItems, isLast } = await fetchSongs(searchTerm, page)
    setSearchResults((prev) => [...prev, ...newItems])
    setHasMore(!isLast)
    setPage((prev) => prev + 1)
    setLoading(false)
  }, [loading, hasMore, page, searchTerm])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          scrollContainerRef.current
        if (scrollHeight - scrollTop <= clientHeight * 1.5) {
          loadMoreItems()
        }
      }
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [loadMoreItems])

  const handleSearch = async () => {
    setSearchResults([])
    setPage(0)
    setHasMore(true)
    setLoading(true)

    const { newItems, isLast } = await fetchSongs(searchTerm, 0)
    setSearchResults(newItems)
    setHasMore(!isLast)
    setLoading(false)
  }

  useEffect(() => {
    if (searchTerm.length > 0) {
      handleSearch()
    }
  }, [searchTerm])

  const handleSelectSong = (song: Song) => {
    const isSelected = selectedSongs.some((s) => s.songId === song.songId)

    if (isSelected) {
      setSelectedSongs(selectedSongs.filter((s) => s.songId !== song.songId))
    } else {
      setSelectedSongs([...selectedSongs, song])
    }
  }

  const handleTypeChange = (songId: number, type: CoverType) => {
    setSearchResults(
      searchResults.map((song) =>
        song.songId === songId
          ? {
              ...song,
              songType: type,
              songId:
                type === 'melting' ? song.meltingSongId! : song.aiCoverSongId!,
            }
          : song,
      ),
    )

    setSelectedSongs(
      selectedSongs.map((song) =>
        song.songId === songId
          ? {
              ...song,
              songType: type,
              songId:
                type === 'melting' ? song.meltingSongId! : song.aiCoverSongId!,
            }
          : song,
      ),
    )
  }

  const handleMelting = () => {
    navigate('/music')
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
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 600px)' }}
      >
        {searchResults.map((song) => (
          <SongItem
            key={`${song.songId}`}
            {...song}
            isSelected={selectedSongs.some((s) => s.songId === song.songId)}
            onSelect={() => handleSelectSong(song)}
            onTypeChange={(value) => handleTypeChange(song.songId, value)}
            showTypeSelect
            meltingSongId={song.meltingSongId || null}
            aiCoverSongId={song.aiCoverSongId || null}
          />
        ))}
        {searchResults.length === 0 && !loading && (
          <div className="mt-16 text-center">
            <p>검색한 곡이 없습니다.</p>
            <Button type="button" onClick={handleMelting} className="mt-4">
              녹음 하러 가기
            </Button>
          </div>
        )}
        {loading && <p className="mt-16 text-center">로딩 중...</p>}
      </div>

      <div className="text-sm text-primary-500 space-y-1">
        <div className="flex flex-wrap items-center">
          <span>※ 음표(</span>
          <MusicNote width={15} height={15} fill="#adadad" />
          <span>)를 클릭하여 곡을 추가/삭제할 수 있습니다.</span>
        </div>
        <p className="flex items-center">
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
