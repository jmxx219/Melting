import { SongListProps } from '@/types/song'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Mic } from 'lucide-react'

interface ExtendedSongListProps extends SongListProps {
  onSelectSong: (songId: number) => void
}

export default function MusicList({ songs, showNumbers, selectId, onSelectSong }: ExtendedSongListProps) {
  if (!songs || songs.length === 0) {
    return (
      <div className="w-full h-full flex items-center flex-1 justify-center">
        <p className="text-[#A5A5A5]">검색한 곡이 없습니다.</p>
      </div>
    )
  }
  return (
    <div className="w-full">
      {songs &&
        songs.map((song, index) => (
          <Card
            key={song.songId}
            className={`border-0 rounded-none shadow-none ${selectId === song.songId ? 'bg-[#FFF3DF]' : ''}`}
            onClick={() => onSelectSong(song.songId)}
          >
            <CardContent className="p-3 flex items-center">
              {showNumbers && <span className="text-sm font-medium text-gray-500 w-6 text-center">{index + 1}</span>}
              <Avatar className="h-10 mx-1">
                <AvatarImage src={song.albumCoverImgUrl} alt={`${song.songTitle} cover`} />
              </Avatar>
              <div className="flex-grow px-2">
                <h3 className="text-sm font-semibold">{song.songTitle}</h3>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
              {selectId == song.songId && (
                <>
                  <Button variant="outline" size="icon" className="bg-[#FFAF25] rounded-full">
                    <Mic className="h-4 w-4 text-white" />
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
