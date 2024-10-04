import Layout from '@/components/Layout'
import MusicRecordrHeader from '@/components/Layout/MusicRecordrHeader'
import MusicRecordContent from '@/components/Music/MusicRecordContent'
import { Song } from '@/types/song'

interface MusicRecord extends Song {
  lyrics: string
  audioSrc: string
}

export default function MusicRecord() {
  // const { songId } = location.state || {}
  const song: MusicRecord = {
    songId: 1,
    songTitle: 'Blueming',
    artist: '아이유',
    albumCoverImageUrl: 'https://github.com/shadcn.png',
    lyrics:
      'dsadsd\n dasdasdada\n dasdasdas\n dsadsd\n dasdasdada\n dasdasdas dsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdas ',
    audioSrc:
      'https://d35fpwscei7sb8.cloudfront.net/audio/original_song/mr/1.mp3',
    nickname: '쏠랑쏠랑',
    songType: 'melting',
    aiCoverSongId: 1,
    meltingSongId: 2,
  }
  // const [song, setSong] = useState<MusicRecord>({
  //   songId: 1,
  //   songTitle: 'Blueming',
  //   artist: '아이유',
  //   albumCoverImgUrl: 'https://github.com/shadcn.png',
  //   lyrics:
  //     'dsadsd\n dasdasdada\n dasdasdas\n dsadsd\n dasdasdada\n dasdasdas dsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdas ',
  //   audioSrc:
  //     'https://d35fpwscei7sb8.cloudfront.net/audio/original_song/mr/1.mp3',
  // })
  /*   useEffect(() => {
    if (songId) {
      fetch(`/api/songs/${songId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('서버에서 데이터를 가져오는데 실패했습니다.')
          }
          return response.json()
        })
        .then((data: Song) => {
          setSong(data)
        })
    }
  }, [songId]) */
  return (
    <Layout
      Header={
        <MusicRecordrHeader artist={song.artist} songTitle={song.songTitle} />
      }
      children={
        <MusicRecordContent lyrics={song.lyrics} audioSrc={song.audioSrc} />
      }
      showFooter={false}
      isHidden={true}
    ></Layout>
  )
}
