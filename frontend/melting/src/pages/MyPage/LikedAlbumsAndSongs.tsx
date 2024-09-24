import DefaultHeader from '@/components/layout/DefaultHeader'
import Layout from '@/components/layout/Layout'
import { ChevronLeft } from 'lucide-react'
import AlbumSongToggle from '@/components/MyPage/AlbumSongToggle'

export default function LikedAlbumsAndSongs() {
  return (
    <Layout
      Header={
        <DefaultHeader
          title="좋아요한 앨범/곡"
          buttonArea={<ChevronLeft color="#FFAF25" />}
        />
      }
      children={<AlbumSongToggle viewType="liked" />}
    ></Layout>
  )
}
