import DefaultHeader from '@/components/Layout/DefaultHeader'
import Layout from '@/components/Layout'
import Logo from '@/components/Layout/Logo'
import CommunityMain from '@/components/Community/CommunityMain.tsx'

export default function CommunityMainPage() {
  return (
    <Layout
      Header={
        <DefaultHeader
          title="커뮤니티"
          buttonArea={<Logo width={10} height={10} />}
          disableBack={true}
        />
      }
      children={<CommunityMain />}
      isMainCenter={true}
      showFooter={true}
    ></Layout>
  )
}
