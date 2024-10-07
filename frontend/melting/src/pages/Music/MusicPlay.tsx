import { songApi } from '@/apis/songApi'
import Layout from '@/components/Layout'
import MusicPlayerHeader from '@/components/Layout/MusicPlayerHeader'
import MusicPlayContent from '@/components/Music/MusicPlayContent'
import { SongDetailsResponseDto } from '@/types/album'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function MusicPlay() {
  const location = useLocation()
  const { songId } = location.state || {}
  const [song, setSong] = useState<SongDetailsResponseDto | undefined>(
    undefined,
  )

  useEffect(() => {
    const getSong = async () => {
      if (!songId) return

      const response = await songApi.getSong(songId)

      setSong(response)
    }

    getSong()
  }, [songId])

  const navigate = useNavigate()
  const onClose = () => {
    navigate(-1)
  }

  return (
    <Layout
      Header={
        song && (
          <MusicPlayerHeader
            artist={`${song.nickname} Original by ${song.artist}`}
            songTitle={song.songTitle}
            onClose={onClose}
          />
        )
      }
      children={song && <MusicPlayContent song={song} />}
      showFooter={false}
      isHidden={true}
    ></Layout>
  )
}
