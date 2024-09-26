import { useNavigate } from 'react-router-dom'
import { Plus, Minus, Crown } from 'lucide-react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import MusicNote from '../Icon/MusicNote'

import { useAlbumContext } from '@/contexts/AlbumContext'
import { Button } from '@/components/ui/button'

export default function SongSelection() {
  const navigate = useNavigate()
  const { selectedSongs, setSelectedSongs, titleSongIndex, setTitleSongIndex } =
    useAlbumContext()

  const handleAddSong = () => {
    navigate('/album/create/song-selection')
  }

  const handleRemoveSong = (songId: number) => {
    const songIndex = selectedSongs.findIndex((song) => song.songId === songId)
    const newSongs = selectedSongs.filter((song) => song.songId !== songId)
    setSelectedSongs(newSongs)

    if (titleSongIndex === songId) {
      setTitleSongIndex(null)
    } else if (
      titleSongIndex !== null &&
      songIndex !== -1 &&
      songIndex < selectedSongs.length
    ) {
      setTitleSongIndex(titleSongIndex)
    }
  }

  const handleSetTitleSong = (songId: number) => {
    setTitleSongIndex(songId === titleSongIndex ? null : songId)
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(selectedSongs)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSelectedSongs(items)
    if (titleSongIndex !== null) {
      const titleSong = selectedSongs.find(
        (song) => song.songId === titleSongIndex,
      )
      if (titleSong) {
        const newIndex = items.findIndex(
          (song) => song.songId === titleSong.songId,
        )
        setTitleSongIndex(items[newIndex].songId)
      }
    }
  }

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="songs">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${selectedSongs.length > 0 ? '' : 'border-b-2'} rounded-md p-2`}
            >
              {selectedSongs.length === 0 ? (
                <div className="flex justify-between items-center text-sm text-gray">
                  <span>나의 곡을 선택해주세요</span>
                  <MusicNote />
                </div>
              ) : (
                <ul className="space-y-2">
                  {selectedSongs.map((song, index) => (
                    <Draggable
                      key={song.songId}
                      draggableId={song.songId.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
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
                            <span>{`${index + 1}. ${song.artist} - ${song.songTitle}`}</span>
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
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="text-sm text-primary-500 space-y-1">
        <p className="flex items-center whitespace-nowrap">
          ※ 타이틀 곡(
          <span className="inline-flex items-center">
            <Crown size={14} />
          </span>
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
