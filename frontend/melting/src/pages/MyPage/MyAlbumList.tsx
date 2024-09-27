import { useState } from 'react'
import MyAlbumContent from '@/components/MyPage/MyAlbumContent'

interface AlbumData {
  id: number
  coverImage: string
  albumName: string
  artistName: string
  isLiked: boolean
  likeCount: number
  releaseDate: string
  isPublic: boolean
}

interface MyAlbumListProps {
  sortOption: 'date' | 'popularity'
  viewType: 'my' | 'liked'
}

export default function MyAlbumList({ viewType }: MyAlbumListProps) {
  const [albums] = useState<AlbumData[]>([
    {
      id: 1,
      coverImage:
        'https://image.bugsm.co.kr/album/images/200/40955/4095501.jpg?version=20240307012526.0',
      albumName: 'The Winning Cover Cover Cover Cover',
      artistName: '노원핵주먹',
      isLiked: true,
      likeCount: 120,
      releaseDate: '2024-09-10',
      isPublic: true,
    },
    {
      id: 2,
      coverImage:
        'https://image.bugsm.co.kr/album/images/200/40955/4095501.jpg?version=20240307012526.0',
      albumName: '좋은 날 Cover',
      artistName: '노원핵주먹',
      isLiked: false,
      likeCount: 1501234,
      releaseDate: '2022-12-09',
      isPublic: true,
    },
    {
      id: 3,
      coverImage:
        'https://image.bugsm.co.kr/album/images/200/40955/4095501.jpg?version=20240307012526.0',
      albumName: 'Palette Cover',
      artistName: '노원핵주먹',
      isLiked: true,
      likeCount: 30436,
      releaseDate: '2021-04-21',
      isPublic: false,
    },
  ])

  return (
    <div>
      <div className="album-list">
        {albums.map((album) => (
          <MyAlbumContent key={album.id} album={album} viewType={viewType} />
        ))}
      </div>
    </div>
  )
}
