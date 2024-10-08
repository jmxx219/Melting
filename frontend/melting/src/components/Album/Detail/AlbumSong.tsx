import SongContent from '@/components/Common/SongContent'
import { SongDetailsResponseDto } from '@/types/album'
import { Clock4 } from 'lucide-react'

type AlbumSongProps = {
  songs: SongDetailsResponseDto[]
  fetchSong?: () => void
}

export default function AlbumSong({ songs, fetchSong }: AlbumSongProps) {
  return (
    <div id="album-song" className="mt-10">
      <div className="flex items-center gap-3 text-gray-400 border-b-2 py-3 mb-3">
        <div className="w-6 h-6 flex items-center justify-center text-base">
          #
        </div>
        <div className="flex-1">
          <div className="font-bold text-sm flex items-center">제목</div>
        </div>
        <div className="flex justify-center items-center">
          <Clock4 width={18} height={18} />
        </div>
      </div>
      {songs.map((song, index) => (
        <SongContent
          key={song.songId}
          song={song}
          hasProfileImage={false}
          isTitle={false}
          songOrder={index + 1}
          fetchSongs={fetchSong}
        />
      ))}
    </div>
  )
}
