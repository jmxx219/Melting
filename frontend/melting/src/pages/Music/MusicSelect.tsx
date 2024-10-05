import DefaultHeader from '@/components/Layout/DefaultHeader'
import Layout from '@/components/Layout'
import MusicSelectList from '@/components/Music/MusicSelectList'
import { ChevronLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function MusicSelect() {
  const location = useLocation()
  const navigate = useNavigate()
  const { type } = location.state || {}
  console.log(type)

  return (
    <Layout
      Header={
        <DefaultHeader
          title="곡 선택"
          buttonArea={<ChevronLeft color="#FFAF25" />}
          move={() => {
            navigate('/music')
          }}
        />
      }
      children={<MusicSelectList recordType={type} />}
      showFooter={false}
    ></Layout>
  )
}
