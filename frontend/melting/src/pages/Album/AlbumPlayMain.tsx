import Layout from '@/components/Layout'
import MusicPlayerHeader from '@/components/layout/MusicPlayerHeader'
import MusicPlayContent from '@/components/Music/MusicPlayContent'
import { SongPlay } from '@/types/songPlay'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
type Props = {}

export default function AlbumPlayMain({}: Props) {
  //   const location = useLocation()
  //   const { albumId } = location.state || {}
  const navigate = useNavigate()

  const [songIdx, setSongIdx] = useState(0)

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
      like: 0,
    },
    {
      songId: 1,
      songTitle: 'Blueming2',
      artist: '아이유',
      albumCoverImgUrl: 'https://github.com/shadcn.png',
      lyrics:
        'dsadsd\n dasdasdada\n dasdasdas\n dsadsd\n dasdasdada\n dasdasdas dsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdas ',
      audioSrc:
        'https://d35fpwscei7sb8.cloudfront.net/audio/original_song/mr/2.mp3',
      like: 0,
    },
    {
      songId: 1,
      songTitle: 'Blueming3',
      artist: '아이유',
      albumCoverImgUrl: 'https://github.com/shadcn.png',
      lyrics:
        'dsadsd\n dasdasdada\n dasdasdas\n dsadsd\n dasdasdada\n dasdasdas dsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdasdsadsd\n dasdasdada\n dasdasdas ',
      audioSrc:
        'https://d35fpwscei7sb8.cloudfront.net/audio/original_song/mr/3.mp3',
      like: 0,
    },
  ]

  const handleNext = useCallback(() => {
    setSongIdx((prevIdx) => (prevIdx + 1) % songs.length)
  }, [songs.length])

  const handlePrev = useCallback(() => {
    setSongIdx((prevIdx) => (prevIdx - 1 + songs.length) % songs.length)
  }, [songs.length])
  const onCloe = () => {
    navigate('/')
  }
  return (
    <Layout
      Header={
        <MusicPlayerHeader
          artist={`${songs[songIdx].nickname} Original by ${songs[songIdx].artist}`}
          songTitle={songs[songIdx].songTitle}
          onClose={onCloe}
        />
      }
      children={
        <MusicPlayContent
          song={songs[songIdx]}
          isAlbumPlay={true}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      }
      showFooter={false}
      isHidden={true}
    ></Layout>
  )
}
