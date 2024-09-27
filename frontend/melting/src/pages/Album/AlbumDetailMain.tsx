import AlbumDetail from '@/components/Album/Detail/AlbumDetail'
import Layout from '@/components/Layout'
import DefaultHeader from '@/components/Layout/DefaultHeader'
import { ChevronLeft } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export default function AlbumDetailMain() {
  const location = useLocation()
  const { albumId } = location.state || {}
  // const navigate = useNavigate()
  return (
    <Layout
      Header={
        <DefaultHeader
          title={''}
          buttonArea={<ChevronLeft color="#FFAF25" />}
        />
      }
      children={<AlbumDetail albumId={albumId}></AlbumDetail>}
    ></Layout>
  )
}
