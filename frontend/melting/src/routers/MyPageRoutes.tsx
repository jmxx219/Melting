import LikedAlbumsAndSongs from '@/pages/MyPage/LikedAlbumsAndSongs'
import MyAlbumsAndSongs from '@/pages/MyPage/MyAlbumsAndSongs'
import MyPageMain from '@/pages/MyPage/MyPageMain'
import ProfileEdit from '@/pages/MyPage/ProfileEdit'
import { Route, Routes } from 'react-router-dom'

export default function MyPageRoutes() {
  return (
    <Routes>
      <Route index element={<MyPageMain />} />
      <Route path="profile/edit" element={<ProfileEdit />} />
      <Route path="my" element={<MyAlbumsAndSongs />} />
      <Route path="liked" element={<LikedAlbumsAndSongs />} />
    </Routes>
  )
}
