import SongSearch from '@/components/Album/SongSearch'
import DefaultHeader from '@/components/Layout/DefaultHeader'
import Layout from '@/components/Layout'
import { ChevronLeft } from 'lucide-react'

export default function SongSelectionPage() {
  return (
    <Layout
      Header={
        <DefaultHeader
          title="곡 선택"
          buttonArea={<ChevronLeft color="#FFAF25" />}
        />
      }
      children={<SongSearch />}
      showFooter={false}
    />
  )
}
