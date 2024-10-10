import { useParams } from 'react-router-dom'
import DefaultHeader from '@/components/Layout/DefaultHeader'
import Layout from '@/components/Layout'
import { ChevronLeft } from 'lucide-react'
import AlbumSongToggle from '@/components/MyPage/AlbumSongToggle'
import { view, tab, TabType } from '@/types/constType'

export default function LikedAlbumsAndSongs() {
  const { tabType } = useParams<{ tabType?: TabType }>()

  return (
    <Layout
      Header={
        <DefaultHeader
          title="좋아요한 앨범/곡"
          buttonArea={<ChevronLeft color="#FFAF25" />}
        />
      }
      children={
        <AlbumSongToggle
          viewType={view.LIKED}
          tabType={tabType ? tabType : tab.ALBUM}
        />
      }
    ></Layout>
  )
}
