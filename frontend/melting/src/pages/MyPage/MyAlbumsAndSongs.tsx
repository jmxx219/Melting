import DefaultHeader from '@/components/layout/DefaultHeader'
import Layout from '@/components/layout/Layout'
import { ChevronLeft } from 'lucide-react'
import AlbumList from '@/components/MyPage/AlbumList'

export default function ProfileEdit() {
    return (
        <Layout
          Header={
            <DefaultHeader
              title="나의 앨범/곡"
              buttonArea={<ChevronLeft color="#FFAF25" />}
            />
          }
          children={<AlbumList />}
        ></Layout>
      )
}
