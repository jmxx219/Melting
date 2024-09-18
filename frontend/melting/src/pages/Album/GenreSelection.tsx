import GenreSelection from '@/components/Album/GenreSelection'
import Layout from '@/components/layout/Layout'

export default function GenreSelectionPage() {
  return <Layout showHeader children={<GenreSelection />} />
}
