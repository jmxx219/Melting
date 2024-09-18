import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Music, Plus, Minus, Crown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Song } from '@/types/music'

interface SongSelectionProps {
  initialSongs?: Song[]
  titleSongIndex: number | null
  onTitleSongChange: (index: number | null) => void
}

export default function SongSelection({
  initialSongs,
  titleSongIndex,
  onTitleSongChange,
}: SongSelectionProps) {
  const [selectedSongs, setSelectedSongs] = useState<Song[]>(initialSongs || [])
  const navigate = useNavigate()

  useEffect(() => {
    setSelectedSongs(initialSongs || [])
  }, [initialSongs])

  const handleAddSong = () => {
    navigate('/album/create/song-selection') // 곡 검색 페이지로 이동
  }

  const handleRemoveSong = (songId: number) => {
    const songIndex = selectedSongs.findIndex((song) => song.songId === songId)
    setSelectedSongs((prev) => prev.filter((song) => song.songId !== songId))

    if (titleSongIndex === songId) {
      onTitleSongChange(null)
    } else if (
      titleSongIndex !== null &&
      songIndex !== -1 &&
      songIndex < selectedSongs.length
    ) {
      onTitleSongChange(titleSongIndex) // 선택 곡 이후에도 유지
    }
  }

  const handleSetTitleSong = (songId: number) => {
    onTitleSongChange(songId === titleSongIndex ? null : songId)
  }

  return (
    <div className="space-y-4">
      <div
        className={`${selectedSongs.length > 0 ? '' : 'border-b-2'}  rounded-md p-2`}
      >
        {selectedSongs.length === 0 ? (
          <div className="flex justify-between items-center text-sm text-gray">
            <span>나의 곡을 선택해주세요</span>
            <Music size={24} />
          </div>
        ) : (
          <ul className="space-y-2 ">
            {selectedSongs.map((song) => (
              <li
                key={song.songId}
                className="flex items-center justify-between w-full border-b-2 p-1"
              >
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetTitleSong(song.songId)}
                    className={`text-${titleSongIndex === song.songId ? 'primary-400' : 'gray-400'}`}
                  >
                    <Crown size={18} />
                  </Button>
                  <span className="">{`${selectedSongs.findIndex((s) => s.songId === song.songId) + 1}. ${song.artist} - ${song.songTitle}`}</span>{' '}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSong(song.songId)}
                >
                  <Minus size={24} className="text-primary-400" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-sm text-primary-500 space-y-1">
        <p className="flex items-center">
          ※ 타이틀 곡(
          <Crown size={14} />
          )을 지정하지 않으면 1번 트랙이 타이틀 곡이 됩니다
        </p>
        <p>※ 트랙 순서는 드래그로 수정이 가능합니다</p>
      </div>
      <div className="flex justify-center">
        <Button type="button" variant="ghost" size="sm" onClick={handleAddSong}>
          <Plus size={24} className="text-gray-400" />
        </Button>
      </div>
    </div>
  )
}
