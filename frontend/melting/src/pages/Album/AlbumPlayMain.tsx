import { albumApi } from '@/apis/albumApi'
import Layout from '@/components/Layout'
import MusicPlayerHeader from '@/components/Layout/MusicPlayerHeader'
import MusicPlayContent from '@/components/Music/MusicPlayContent'
import { SongDetailsResponseDto } from '@/types/album'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function AlbumPlayMain() {
  const location = useLocation()
  const { albumId } = location.state || {}

  const navigate = useNavigate()
  const [songs, setSongs] = useState<SongDetailsResponseDto[]>([])
  const [songIdx, setSongIdx] = useState(0)

  useEffect(() => {
    const fetchInitialSongs = async () => {
      if (!albumId) {
        console.error('No albumId provided.')
        return
      }

      try {
        const response = await albumApi.getAlbumDetails(albumId)
        setSongs(response.songs)
      } catch (error) {
        console.error('Failed to fetch album details:', error)
      }
    }

    fetchInitialSongs()
  }, [albumId])

  const handleNext = useCallback(() => {
    setSongIdx((prevIdx) => (prevIdx + 1) % songs.length)
  }, [songs.length])

  const handlePrev = useCallback(() => {
    setSongIdx((prevIdx) => (prevIdx - 1 + songs.length) % songs.length)
  }, [songs.length])

  const onClose = () => {
    if (location.key === 'default') {
      navigate('/main')
    } else {
      navigate(-1)
    }
  }

  return (
    <Layout
      Header={
        songs.length > 0 && (
          <MusicPlayerHeader
            artist={`${songs[songIdx].nickname} Original by ${songs[songIdx].artist}`}
            songTitle={songs[songIdx].songTitle}
            onClose={onClose}
          />
        )
      }
      children={
        songs.length > 0 && (
          <MusicPlayContent
            song={songs[songIdx]}
            isAlbumPlay={true}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      }
      showFooter={false}
      isHidden={true}
    ></Layout>
  )
}
