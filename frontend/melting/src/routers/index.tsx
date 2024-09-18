import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/Login/Login'
import SignupPage from '@/pages/Login/Signup'
import MusicSelect from '@/pages/music/MusicSelect'
import MusciMain from '@/pages/music/MusciMain'
// import HomePage from '@/pages/Home/Home'

const AlbumRegist = React.lazy(() => import('@/pages/Album/AlbumRegist'))
const SongSelection = React.lazy(() => import('@/pages/Album/SongSelection'))
const GenreSelection = React.lazy(() => import('@/pages/Album/GenreSelection'))
// const AlbumEdit = React.lazy(() => import('@/pages/Album/AlbumEdit'));

// Loading component for suspense fallback
const Loading = () => <div>Loading...</div>

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/album">
            <Route path="create" element={<AlbumRegist />} />
            <Route path="create/song-selection" element={<SongSelection />} />
            <Route path="create/genre-selection" element={<GenreSelection />} />
            {/* <Route path=":id/edit" element={<AlbumEdit />} /> */}
          </Route>
          <Route path="/music" element={<MusciMain />} />
          <Route path="/music/list" element={<MusicSelect />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
