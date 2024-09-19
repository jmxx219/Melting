import GenreSelection from '@/components/Album/GenreSelection'
import DefaultHeader from '@/components/layout/DefaultHeader'
import Layout from '@/components/layout/Layout'
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
