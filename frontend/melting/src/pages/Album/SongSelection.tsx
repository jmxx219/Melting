import SongSearch from '@/components/Album/SongSearch'
import DefaultHeader from '@/components/layout/DefaultHeader'
import Layout from '@/components/layout/Layout'
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
