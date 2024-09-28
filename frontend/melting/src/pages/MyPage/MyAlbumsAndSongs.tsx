import DefaultHeader from '@/components/Layout/DefaultHeader'
import Layout from '@/components/Layout'
import { ChevronLeft } from 'lucide-react'
import AlbumSongToggle from '@/components/MyPage/AlbumSongToggle'

export default function MyAlbumsAndSongs() {
  return (
    <Layout
      Header={
        <DefaultHeader
          title="나의 앨범/곡"
          buttonArea={<ChevronLeft color="#FFAF25" />}
        />
      }
      children={<AlbumSongToggle viewType="my" />}
    ></Layout>
  )
}