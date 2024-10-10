import CommentList from '@/components/Album/comment/CommentList'
import Layout from '@/components/Layout'
import DefaultHeader from '@/components/Layout/DefaultHeader'
import { ChevronLeft } from 'lucide-react'
import { useLocation } from 'react-router-dom'

type Props = {}

export default function CommentMain({}: Props) {
  const location = useLocation()
  const { albumId } = location.state || {}

  return (
    <Layout
      Header={
        <DefaultHeader
          title={'앨범 댓글'}
          buttonArea={<ChevronLeft color="#FFAF25" />}
        />
      }
      children={<CommentList albumId={albumId} />}
    ></Layout>
  )
}
