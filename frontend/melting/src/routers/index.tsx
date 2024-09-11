import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/Login/start'
import MusciMain from '@/pages/music/MusciMain'
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/music" element={<MusciMain />} />
      </Routes>
    </Router>
  )
}
