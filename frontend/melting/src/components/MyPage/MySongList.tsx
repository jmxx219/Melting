import MySongContent from '@/components/MyPage/MySongContent'

interface AlbumSongToggleProps {
  sortOption: 'date' | 'popularity'
}

export default function MySongList({}: AlbumSongToggleProps) {
  const data = {
    originalSong: [
      {
        originalSongId: 1,
        artist: '아이유',
        songTitle: '좋은 날',
        songList: [
          {
            songId: 1,
            albumCoverImgUrl:
              'https://image.bugsm.co.kr/album/images/200/40955/4095501.jpg?version=20240307012526.0',
            songType: 'melting',
            likeCount: 12345678,
            isLiked: true,
          },
          {
            songId: 2,
            albumCoverImgUrl:
              'https://image.bugsm.co.kr/album/images/200/40955/4095501.jpg?version=20240307012526.0',
            songType: 'AICover',
            likeCount: 12345,
            isLiked: false,
          },
        ],
      },
      {
        originalSongId: 2,
        artist: '아이유',
        songTitle: '노래 제목 2',
        songList: [
          {
            songId: 3,
            albumCoverImgUrl:
              'https://image.bugsm.co.kr/album/images/200/40955/4095501.jpg?version=20240307012526.0',
            songType: 'AICover',
            likeCount: 67890,
            isLiked: true,
          },
        ],
      },
    ],
    isPossibleAiCover: false, // AI 커버 가능 여부
  }

  return (
    <div>
      {data.originalSong.map((song) => (
        <MySongContent
          key={song.originalSongId}
          originalSong={song}
          isPossibleAiCover={data.isPossibleAiCover}
        />
      ))}
    </div>
  )
}
