import { musicApi } from '@/apis/music/musicApi'
import Layout from '@/components/Layout'
import MusicRecordrHeader from '@/components/Layout/MusicRecordrHeader'
import MusicRecordContent from '@/components/Music/MusicRecordContent'
import { OriginalSongResponseDto } from '@/types/song'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function MusicRecord() {
  const location = useLocation()
  const { songId } = location.state || {}

  const [song, setSong] = useState<OriginalSongResponseDto>()
  useEffect(() => {
    const fetchInitialSongs = async () => {
      const response = await musicApi.originalSongDetail(songId)
      setSong(response)
    }

    fetchInitialSongs()
  }, [])
  return (
    <Layout
      Header={
        <MusicRecordrHeader
          artist={song?.artist || 'Unknown Artist'}
          songTitle={song?.title || 'Unknown Title'}
        />
      }
      children={
        <MusicRecordContent
          lyrics={song?.lyrics}
          audioSrc={song?.mrUrl}
          originalSongId={songId}
        />
      }
      showFooter={false}
      isHidden={true}
    ></Layout>
  )
}
