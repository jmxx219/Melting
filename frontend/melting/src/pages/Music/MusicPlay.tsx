import Layout from '@/components/layout/Layout'
import MusicPlayerHeader from '@/components/layout/MusicPlayerHeader'
import MusicPlayContent from '@/components/Music/MusicPlayContent'
import { SongPlay } from '@/types/songPlay'
import { useNavigate } from 'react-router-dom'

type Props = {}

export default function MusicPlay({}: Props) {
  // const location = useLocation()
  // const {songId} = location.state || {};

  const song: SongPlay = {
    songId: 1,
    songTitle: 'Blueming',
    artist: '아이유',
    albumCoverImgUrl: 'https://github.com/shadcn.png',
    lyrics:
      'dsadsd\n dasdasdada\n dasdasdas\n dsadsd\n dasdasdada\n dasdasdas dsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdas ',
    audioSrc:
      'https://d35fpwscei7sb8.cloudfront.net/audio/original_song/mr/1.mp3',
    like: 0,
  }

  const navigate = useNavigate()
  const onCloe = () => {
    navigate('/')
  }
  return (
    <Layout
      Header={
        <MusicPlayerHeader
          artist={song.artist}
          songTitle={song.songTitle}
          onClose={onCloe}
        />
      }
      children={<MusicPlayContent song={song} />}
      showFooter={false}
      isHidden={true}
    ></Layout>
  )
}
