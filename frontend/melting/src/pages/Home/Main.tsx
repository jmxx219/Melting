import Main from '@/components/Home/Main'
import DefaultHeader from '@/components/Layout/DefaultHeader'
import Layout from '@/components/Layout/Layout'
import Logo from '@/components/Layout/Logo'

export default function MainPage() {
  return (
    <Layout
      Header={
        <DefaultHeader
          title="멜팅"
          buttonArea={<Logo width={10} height={10} />}
        />
      }
      children={<Main />}
      isMainCenter={true}
      showFooter={true}
    ></Layout>
  )
}
