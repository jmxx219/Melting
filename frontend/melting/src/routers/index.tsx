import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/Login/Login'
import SignupPage from '@/pages/Login/Signup'
import MusicSelect from '@/pages/music/MusicSelect'
import MusciMain from '@/pages/music/MusicMain'
import MusciRecord from '@/pages/music/MusicRecord'

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/music" element={<MusciMain />} />
        <Route path="/music/list" element={<MusicSelect />} />
        <Route path="/music/record" element={<MusciRecord />} />
      </Routes>
    </Router>
  )
}
