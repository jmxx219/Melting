import { useParams } from 'react-router-dom'
import DefaultHeader from '@/components/Layout/DefaultHeader'
import Layout from '@/components/Layout'
import { ChevronLeft } from 'lucide-react'
import AlbumSongToggle from '@/components/MyPage/AlbumSongToggle'
import { TabType, view, tab } from '@/types/constType'

export default function MyAlbumsAndSongs() {
  const { tabType } = useParams<{ tabType?: TabType }>()

  return (
    <Layout
      Header={
        <DefaultHeader
          title="나의 앨범/곡"
          buttonArea={<ChevronLeft color="#FFAF25" />}
        />
      }
      children={
        <AlbumSongToggle
          viewType={view.MY}
          tabType={tabType ? tabType : tab.ALBUM}
        />
      }
    ></Layout>
  )
}
