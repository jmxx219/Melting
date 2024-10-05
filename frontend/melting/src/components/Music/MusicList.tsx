import { SongListProps } from '@/types/song'
import { Mic } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

interface ExtendedSongListProps extends SongListProps {
  onSelectSong: (songId: number | undefined) => void
  onSelectRecord: () => void
}

export default function MusicList({
  songs,
  showNumbers,
  selectId,
  onSelectSong,
  onSelectRecord,
}: ExtendedSongListProps) {
  return (
    <div className="w-full">
      {songs &&
        songs.map((song, index) => (
          <Card
            key={song.originalSongId}
            className={`mb-2 border-0 rounded-none shadow-none ${selectId === song.originalSongId ? 'bg-[#FFF3DF]' : ''}`}
            onClick={() => onSelectSong(song.originalSongId)}
          >
            <CardContent className="flex items-center p-0 py-2">
              {showNumbers && (
                <span className="text-sm font-medium text-gray-500 w-6 text-center">
                  {index + 1}
                </span>
              )}
              <Avatar className="h-10 mx-1">
                <AvatarImage
                  src={song.coverImageUrl}
                  alt={`${song.title} cover`}
                />
              </Avatar>
              <div className="flex-grow px-2">
                <h3 className="text-sm font-semibold">{song.title}</h3>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
              {selectId == song.originalSongId && (
                <div className="px-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-[#FFAF25] rounded-full"
                    onClick={onSelectRecord}
                  >
                    <Mic className="h-4 w-4 text-white" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
