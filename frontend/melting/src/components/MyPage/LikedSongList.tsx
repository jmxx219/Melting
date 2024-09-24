import LikedSong from '@/components/MyPage/LikedSong'

interface LikedSongListProps {
  sortOption: 'date' | 'popularity'
}

export default function LikedSongList({ sortOption }: LikedSongListProps) {
  const songs = [
    {
      song_id: 1,
      album_cover_img_url: 'https://example.com/album_cover.jpg',
      artist: '아이유',
      song_title: '좋아한 노래 제목 1',
      nickname: '방배동 전상현',
      execution_time: '3:14',
      like_count: 12345,
      isLiked: true,
    },
  ]

  return (
    <div>
      {songs.map((song) => (
        <LikedSong key={song.song_id} song={song} />
      ))}
    </div>
  )
}
