import { SongListProps } from '@/types/song'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Mic } from 'lucide-react'

export default function MusicList({ songs, showNumbers }: SongListProps) {
  return (
    <div className="w-full">
      {songs.map((song, index) => (
        <Card key={song.id} className={`border-0 rounded-none shadow-none ${song.isSelect ? 'bg-[#FFF3DF]' : ''}`}>
          <CardContent className="p-3 flex items-center">
            {showNumbers && <span className="text-sm font-medium text-gray-500 w-6 text-center">{index + 1}</span>}
            <Avatar className="h-10 mx-1">
              <AvatarImage src={song.coverUrl} alt={`${song.title} cover`} />
            </Avatar>
            <div className="flex-grow px-2">
              <h3 className="text-sm font-semibold">{song.title}</h3>
              <p className="text-sm text-gray-500">{song.artist}</p>
            </div>
            {song.isSelect && (
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
