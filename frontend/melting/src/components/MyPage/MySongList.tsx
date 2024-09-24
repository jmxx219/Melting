import MySong from '@/components/MyPage/MySong'

interface AlbumSongToggleProps {
  sortOption: 'date' | 'popularity'
}

export default function MySongList({ sortOption }: AlbumSongToggleProps) {
  const songs = [
    {
      songId: 1,
      artist: '아이유',
      songTitle: '좋은 날',
      nickname: '내 손을 잡아',
      songList: [
        {
          albumCoverImgUrl:
            'https://image.bugsm.co.kr/album/images/200/40955/4095501.jpg?version=20240307012526.0',
          songType: 'melting',
          likeCount: 12345,
          isLiked: true,
        },
        {
          albumCoverImgUrl:
            'https://image.bugsm.co.kr/album/images/200/40955/4095501.jpg?version=20240307012526.0',
          songType: 'AICover',
          likeCount: 12345,
          isLiked: false, // Like 상태가 잘못되어 발생하는 오류 방지
        },
      ],
    },
    {
      songId: 2,
      artist: '아이유',
      songTitle: '노래 제목 2',
      nickname: '노원핵주먹',
      songList: [
        {
          albumCoverImgUrl: 'https://example.com/album_cover.jpg',
          songType: 'AICover',
          likeCount: 67890,
          isLiked: true, // Like 상태가 누락되면 오류 발생 가능
        },
      ],
    },
  ]

  return (
    <div>
      {songs.map((song) => (
        <MySong key={song.songId} song={song} />
      ))}
    </div>
  )
}
