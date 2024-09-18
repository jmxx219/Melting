import Layout from '@/components/layout/Layout'
import TitleHeader from '@/components/layout/TitleHeader'
import MusicTypeSelect from '@/components/music/MusicTypeSelect'

export default function MusciMain() {
  return (
    <Layout
      Header={<TitleHeader titles={['곡 제작 유형을', '선택해주세요']} />}
      children={<MusicTypeSelect />}
      isMainCenter={true}
    ></Layout>
  )
}
