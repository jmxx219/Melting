import Layout from '@/components/Layout'
import TitleHeader from '@/components/Layout/TitleHeader'
import AlbumEdit from '@/components/Album/Modify/AlbumEdit'

export default function AlbumEditPage() {
  return (
    <Layout
      Header={<TitleHeader titles={['앨범 정보를', '수정해주세요']} />}
      children={<AlbumEdit />}
      isMainCenter={true}
    />
  )
}
