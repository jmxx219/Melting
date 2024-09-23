import Layout from '@/components/layout/Layout'
import MusicPlayerHeader from '@/components/layout/MusicPlayerHeader'
import MusicPlayContent from '@/components/Music/MusicPlayContent'
import { SongPlay } from '@/types/songPlay'
import { useState } from 'react'

type Props = {}

export default function MusicPlayList({}: Props) {
  const [playIdx, setplayIdx] = useState(0)
  const songs: SongPlay[] = [
    {
      songId: 1,
      songTitle: 'Blueming',
      artist: '아이유',
      albumCoverImgUrl: 'https://github.com/shadcn.png',
      lyrics:
        'dsadsd\n dasdasdada\n dasdasdas\n dsadsd\n dasdasdada\n dasdasdas dsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdas ',
      audioSrc:
        'https://d35fpwscei7sb8.cloudfront.net/audio/original_song/mr/1.mp3',
    },
  ]
  return (
    <Layout
      Header={
        <MusicPlayerHeader
          artist={songs[0].artist}
          songTitle={songs[0].songTitle}
          isClose={true}
        />
      }
      children={
        <MusicPlayContent
          songs={songs}
          lyrics={songs[0].lyrics}
          audioSrc={songs[0].audioSrc}
        />
      }
      showFooter={false}
      isHidden={true}
    ></Layout>
  )
}
