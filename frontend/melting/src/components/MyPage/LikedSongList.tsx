import SongContent from '@/components/MyPage/SongContent'

interface LikedSongListProps {
  sortOption: 'date' | 'popularity'
}

export default function LikedSongList({}: LikedSongListProps) {
  const songs = [
    {
      songId: 1,
      albumCoverImgUrl:
        'https://image.bugsm.co.kr/album/images/200/40955/4095501.jpg?version=20240307012526.0',
      artist: '아이유',
      songTitle: '좋아한 노래 제목 1입니다아아아',
      nickname: '노원핵주먹안녕하세요노원핵주먹안녕하세요',
      executionTime: '3:14',
      likeCount: 123,
      isLiked: true,
      // songOrder: 1,
      // isTitle: true,
    },
    {
      songId: 2,
      albumCoverImgUrl:
        'https://image.bugsm.co.kr/album/images/200/40955/4095501.jpg?version=20240307012526.0',
      artist: '아이유',
      songTitle: '좋아한 노래 제목 2',
      nickname: '노원핵주먹',
      executionTime: '3:14',
      likeCount: 12345,
      isLiked: true,
      // songOrder: 2,
    },
  ]

  return (
    <div>
      {songs.map((song) => (
        <SongContent key={song.songId} song={song} hasProfileImage={true} />
      ))}
    </div>
  )
}
