import DefaultHeader from '@/components/Layout/DefaultHeader'
import Layout from '@/components/Layout'
import { ChevronLeft } from 'lucide-react'
import ProfileEditForm from '@/components/MyPage/ProfileEditForm'

export default function ProfileEdit() {
  return (
    <Layout
      Header={
        <DefaultHeader
          title="회원 정보 수정"
          buttonArea={<ChevronLeft color="#FFAF25" />}
        />
      }
      children={<ProfileEditForm />}
      showFooter={false}
    ></Layout>
  )
}
