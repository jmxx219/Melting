import Layout from '@/components/layout/Layout'
import TitleHeader from '@/components/layout/TitleHeader'
import MyPageSelect from '@/components/MyPage/MyPageSelect'

export default function MyPageMain() {
  return (
    <Layout
      Header={<TitleHeader titles={[]} />}
      children={<MyPageSelect />}
      isMainCenter={true}
    ></Layout>
  )
}
