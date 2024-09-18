import DefaultHeader from '@/components/layout/DefaultHeader'
import Layout from '@/components/layout/Layout'
import MusicSelectList from '@/components/music/MusicSelectList'
import { ChevronLeft } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export default function MusicSelect() {
  const location = useLocation()
  const { type } = location.state || {}
  console.log(type)

  return (
    <Layout
      Header={<DefaultHeader title="곡 선택" buttonArea={<ChevronLeft color="#FFAF25" />} />}
      children={<MusicSelectList />}
      showFooter={false}
    ></Layout>
  )
}
