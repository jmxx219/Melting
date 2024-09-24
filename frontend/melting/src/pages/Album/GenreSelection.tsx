import GenreSelection from '@/components/Album/GenreSelection'
import DefaultHeader from '@/components/Layout/DefaultHeader'
import Layout from '@/components/Layout/Layout'
import { ChevronLeft } from 'lucide-react'

export default function GenreSelectionPage() {
  return (
    <Layout
      Header={
        <DefaultHeader
          title="장르 선택"
          buttonArea={<ChevronLeft color="#FFAF25" />}
        />
      }
      children={<GenreSelection />}
      showFooter={false}
    />
  )
}
