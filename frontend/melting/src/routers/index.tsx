import LoginPage from '@/pages/Login/Login'
import SignupPage from '@/pages/Login/Signup'
import { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AlbumRoutes from './AlbumRoutes'
import MusicRoutes from './MusicRoutes'
import MyPageRoutes from './MyPageRoutes'
import MainPage from '@/pages/Home/Main'
import OAuthRedirectHandler from '@/utils/OAuthUtil.ts'
import ProtectedRoute from './ProtectRouter'
import { AuthProvider } from '@/contexts/AuthContext'

const Loading = () => <div>Loading...</div>

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/login/callback/:provider"
              element={<OAuthRedirectHandler />}
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/album/*" element={<AlbumRoutes />} />
              <Route path="/music/*" element={<MusicRoutes />} />
              <Route path="/mypage/*" element={<MyPageRoutes />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  )
}
