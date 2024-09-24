import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AlbumProvider } from '@/contexts/AlbumContext'

const AlbumRegist = React.lazy(() => import('@/pages/Album/AlbumRegist'))
const SongSelection = React.lazy(() => import('@/pages/Album/SongSelection'))
const GenreSelection = React.lazy(() => import('@/pages/Album/GenreSelection'))

const Loading = () => <div>Loading...</div>

export default function AlbumRoutes() {
  return (
    <AlbumProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="create" element={<AlbumRegist />} />
          <Route path="create/genre-selection" element={<GenreSelection />} />
          <Route path="create/song-selection" element={<SongSelection />} />
        </Routes>
      </Suspense>
    </AlbumProvider>
  )
}
