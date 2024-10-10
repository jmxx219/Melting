import { useParams } from 'react-router-dom'

import AlbumDetail from '@/components/Album/Detail/AlbumDetail'
import Layout from '@/components/Layout'
import DefaultHeader from '@/components/Layout/DefaultHeader'
import { ChevronLeft } from 'lucide-react'

export default function AlbumDetailMain() {
  const { albumId } = useParams()
  return (
    <Layout
      Header={
        <DefaultHeader
          title={''}
          buttonArea={<ChevronLeft color="#FFAF25" />}
        />
      }
      children={
        <AlbumDetail
          albumId={typeof albumId === 'string' ? parseInt(albumId) : -1}
        />
      }
    ></Layout>
  )
}
