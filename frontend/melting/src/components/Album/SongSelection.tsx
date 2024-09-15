import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Music, Plus, Minus, Crown } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Song {
  id: string
  artist: string
  title: string
}

export default function SongSelection() {
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([])
  const [titleSongIndex, setTitleSongIndex] = useState<number | null>(null)
  const navigate = useNavigate()

  const handleAddSong = () => {
    navigate('/album/create/song-selection') // 곡 검색 페이지로 이동
  }

  const handleRemoveSong = (index: number) => {
    setSelectedSongs((prev) => prev.filter((_, i) => i !== index))
    if (titleSongIndex === index) {
      setTitleSongIndex(null)
    } else if (titleSongIndex !== null && titleSongIndex > index) {
      setTitleSongIndex(titleSongIndex - 1)
    }
  }

  const handleSetTitleSong = (index: number) => {
    setTitleSongIndex(index === titleSongIndex ? null : index)
  }

  return (
    <div className="space-y-4">
      <div className="border-b-2 rounded-md p-2">
        {selectedSongs.length === 0 ? (
          <div className="flex justify-between items-center text-sm text-gray">
            <span>나의 곡을 선택해주세요</span>
            <Music size={24} />
          </div>
        ) : (
          <ul className="space-y-2">
            {selectedSongs.map((song, index) => (
              <li
                key={song.id}
                className="flex items-center justify-between w-full border-b border-gray-200 py-2"
              >
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetTitleSong(index)}
                    className={`text-${titleSongIndex === index ? 'primary-400' : 'gray-400'}`}
                  >
                    <Crown size={18} />
                  </Button>
                  <span className="ml-2">{`${index + 1}. ${song.artist} - ${song.title}`}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSong(index)}
                >
                  <Minus size={18} className="text-primary-400" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" size="sm" onClick={handleAddSong}>
          <Plus size={24} className="text-gray-400" />
        </Button>
      </div>

      {titleSongIndex !== null && (
        <div className="text-primary-400 text-sm">
          <p>선택한 곡이 앨범의 대표곡으로 지정됩니다.</p>
          <p>대표곡은 앨범 소개 페이지에서 가장 먼저 표시됩니다.</p>
        </div>
      )}
    </div>
  )
}
