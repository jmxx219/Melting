interface LikedSongProps {
  song: {
    song_id: number
    album_cover_img_url: string
    artist: string
    song_title: string
    nickname: string
    execution_time: string
    like_count: number
    isLiked: boolean
  }
}

export default function LikedSongContent({ song }: LikedSongProps) {
  return (
    <div className="flex items-center mb-4 p-2 border rounded-lg">
      <img
        src={song.album_cover_img_url}
        alt={song.song_title}
        className="w-16 h-16 mr-4 object-cover rounded-lg"
      />

      <div className="flex-1">
        <div className="font-bold">{song.song_title}</div>
        <div className="text-sm text-gray-500">
          {song.artist} / {song.nickname}
        </div>
        <div className="text-xs text-gray-400">{song.execution_time}</div>
      </div>

      <div className="text-sm">좋아요: {song.like_count.toLocaleString()}</div>
    </div>
  )
}
