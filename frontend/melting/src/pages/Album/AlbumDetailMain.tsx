import Layout from '@/components/Layout'
import 
type Props =import DefaultHeader from '@/components/Layout/DefaultHeader'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
 {}

export default function AlbumDetailMain({}: Props) {
  //   const location = useLocation()
  //   const { albumId } = location.state || {}
  const navigate = useNavigate();
  return <Layout 
    Header={<DefaultHeader
        title={""}
        buttonArea={<ChevronLeft color="#FFAF25" />}
        move={() => {
        navigate('/music')
        }}
  />}
  children={}>
 </Layout>
}
