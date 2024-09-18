import Layout from '@/components/layout/Layout'
import AlbumForm from '@/components/Album/AlbumForm'
import TitleHeader from '@/components/layout/TitleHeader'

export default function AlbumRegist() {
  return (
    <Layout
      Header={
        <TitleHeader
          titles={['앨범 정보를', '입력해주세요']}
          comment="* 는 필수항목 입니다"
        />
      }
      children={<AlbumForm />}
      isMainCenter={true}
    />
  )
}
