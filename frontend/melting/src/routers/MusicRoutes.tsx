import MusicMain from '@/pages/Music/MusicMain'
import MusicPlay from '@/pages/Music/MusicPlay'
import MusciRecord from '@/pages/Music/MusicRecord'
import MusicSelect from '@/pages/Music/MusicSelect'
import { Route, Routes } from 'react-router-dom'

const MusicRoutes = () => (
  <Routes>
    <Route index element={<MusicMain />} />
    <Route path="list" element={<MusicSelect />} />
    <Route path="record" element={<MusciRecord />} />
    <Route path="play" element={<MusicPlay />} />
  </Routes>
)

export default MusicRoutes
