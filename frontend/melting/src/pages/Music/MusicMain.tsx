import Layout from '@/components/Layout'
import TitleHeader from '@/components/Layout/TitleHeader'
import MusicTypeSelect from '@/components/Music/MusicTypeSelect'

export default function MusicMain() {
  return (
    <Layout
      Header={<TitleHeader titles={['곡 제작 유형을', '선택해주세요']} />}
      children={<MusicTypeSelect />}
      isMainCenter={true}
    ></Layout>
  )
}
