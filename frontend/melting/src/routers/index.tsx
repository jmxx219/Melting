import LoginPage from '@/pages/Login/Login'
import SignupPage from '@/pages/Login/Signup'
import { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AlbumRoutes from './AlbumRoutes'
import MusicRoutes from './MusicRoutes'
import MyPageRoutes from './MyPageRoutes'
import MainPage from '@/pages/Home/Main'
import OAuthRedirectHandler from '@/utils/OAuthUtil.ts'

const Loading = () => <div>Loading...</div>

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/callback" element={<OAuthRedirectHandler />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/album/*" element={<AlbumRoutes />} />
          <Route path="/music/*" element={<MusicRoutes />} />
          <Route path="/mypage/*" element={<MyPageRoutes />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
