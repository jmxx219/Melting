import AlbumForm from '@/components/Album/AlbumForm'
import Footer from '@/components/layout/Footer'
import TitleHeader from '@/components/layout/TitleHeader'

export default function AlbumRegist() {
  return (
    <div className="container mx-auto p-4">
      <TitleHeader
        titles={['앨범 정보를', '입력해주세요']}
        comment="* 는 필수항목 입니다"
      />
      <AlbumForm />
      <Footer />
    </div>
  )
}
