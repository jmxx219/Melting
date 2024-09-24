import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/Login/Login'
import SignupPage from '@/pages/Login/Signup'
import MusicSelect from '@/pages/Music/MusicSelect'
import MusicMain from '@/pages/Music/MusicMain'
import MyPageMain from '@/pages/MyPage/MyPageMain'
import ProfileEdit from '@/pages/MyPage/ProfileEdit'
import LikedAlbumsAndSongs from '@/pages/MyPage/LikedAlbumsAndSongs'
import MyAlbumsAndSongs from '@/pages/MyPage/MyAlbumsAndSongs'
import MusciRecord from '@/pages/Music/MusicRecord'
import { AlbumProvider } from '@/contexts/AlbumContext'
import MusicPlayList from '@/pages/Music/MusicPlay'
import MusicPlay from '@/pages/Music/MusicPlay'
// import HomePage from '@/pages/Home/Home'

const AlbumRegist = React.lazy(() => import('@/pages/Album/AlbumRegist'))
const SongSelection = React.lazy(() => import('@/pages/Album/SongSelection'))
const GenreSelection = React.lazy(() => import('@/pages/Album/GenreSelection'))
// const AlbumEdit = React.lazy(() => import('@/pages/Album/AlbumEdit'));

// Loading component for suspense fallback
const Loading = () => <div>Loading...</div>

const AlbumRoutes = () => (
  <AlbumProvider>
    <Routes>
      <Route path="create" element={<AlbumRegist />} />
      <Route path="create/genre-selection" element={<GenreSelection />} />
      <Route path="create/song-selection" element={<SongSelection />} />
      {/* <Route path=":id/edit" element={<AlbumEdit />} /> */}
    </Routes>
  </AlbumProvider>
)

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/album/*" element={<AlbumRoutes />} />
          <Route path="/music" element={<MusicMain />} />
          <Route path="/music/list" element={<MusicSelect />} />
          <Route path="/music/record" element={<MusciRecord />} />
          <Route path="/music/play" element={<MusicPlay />} />
          <Route path="/mypage" element={<MyPageMain />} />
          <Route path="/mypage/profile/edit" element={<ProfileEdit />} />
          <Route path="/mypage/my" element={<MyAlbumsAndSongs />} />
          <Route path="/mypage/liked" element={<LikedAlbumsAndSongs />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
