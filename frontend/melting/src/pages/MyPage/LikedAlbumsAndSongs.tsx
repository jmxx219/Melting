import DefaultHeader from '@/components/Layout/DefaultHeader'
import Layout from '@/components/Layout'
import { ChevronLeft } from 'lucide-react'
import AlbumSongToggle from '@/components/MyPage/AlbumSongToggle'
import { view, tab } from '@/types/constType'

export default function LikedAlbumsAndSongs() {
  return (
    <Layout
      Header={
        <DefaultHeader
          title="좋아요한 앨범/곡"
          buttonArea={<ChevronLeft color="#FFAF25" />}
        />
      }
      children={<AlbumSongToggle viewType={view.LIKED} tabType={tab.ALBUM} />}
    ></Layout>
  )
}
