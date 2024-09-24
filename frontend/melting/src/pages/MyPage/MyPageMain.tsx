import Layout from '@/components/Layout/Layout'
import MyPageSelect from '@/components/MyPage/MyPageSelect'

export default function MyPageMain() {
  return (
    <Layout
      showHeader={false}
      children={<MyPageSelect />}
      isMainCenter={true}
    ></Layout>
  )
}
