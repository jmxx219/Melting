import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

import { Song } from '@/types/song'
import { ImageInfo } from '@/types/album.ts'

// AlbumContextType에 이미지 관련 속성 추가
interface AlbumContextType {
  albumName: string
  setAlbumName: (name: string) => void
  albumIntro: string
  setAlbumIntro: (intro: string) => void
  selectedSongs: Song[]
  setSelectedSongs: (songs: Song[]) => void
  titleSongIndex: number | null
  setTitleSongIndex: (index: number | null) => void
  selectedGenres: string[]
  setSelectedGenres: (genres: string[] | ((prev: string[]) => string[])) => void
  selectedHashtags: string[]
  setSelectedHashtags: (hashtags: string[]) => void
  selectedCover: string | null
  setSelectedCover: (cover: string | null) => void
  selectedCoverFile: File | null
  setSelectedCoverFile: (cover: File | null) => void
  images: ImageInfo[]
  setImages: React.Dispatch<React.SetStateAction<ImageInfo[]>>
}

// 기본값은 null이 아닌 적절한 기본 상태를 설정하거나 undefined로 설정
const AlbumContext = createContext<AlbumContextType | undefined>(undefined)

export const useAlbumContext = () => {
  const context = useContext(AlbumContext)
  if (context === undefined) {
    throw new Error('useAlbumContext must be used within an AlbumProvider')
  }
  return context
}

interface AlbumProviderProps {
  children: ReactNode
}

export const AlbumProvider = ({ children }: AlbumProviderProps) => {
  const [albumName, setAlbumName] = useState('')
  const [albumIntro, setAlbumIntro] = useState('')
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([])
  const [titleSongIndex, setTitleSongIndex] = useState<number | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [selectedCover, setSelectedCover] = useState<string | null>(null)
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null)

  // 기본 이미지 상태 설정
  const [images, setImages] = useState<ImageInfo[]>([
    {
      id: 'default1',
      url: 'https://d35fpwscei7sb8.cloudfront.net/image/generated_album_cover/default_cover_image_1.png',
      description: '기본 이미지 1',
      file: null,
      type: 'default',
    },
    {
      id: 'default2',
      url: 'https://d35fpwscei7sb8.cloudfront.net/image/generated_album_cover/default_cover_image_2.png',
      description: '기본 이미지 2',
      file: null,
      type: 'default',
    },
    {
      id: 'default3',
      url: 'https://d35fpwscei7sb8.cloudfront.net/image/generated_album_cover/default_cover_image_3.png',
      description: '기본 이미지 3',
      file: null,
      type: 'default',
    },
  ])

  useEffect(() => {
    if (selectedSongs.length > 0 && titleSongIndex === null) {
      setTitleSongIndex(selectedSongs[0].songId) // 첫 번째 곡의 songId로 설정
    } else if (selectedSongs.length === 0) {
      setTitleSongIndex(null) // 곡이 없으면 null로 설정
    }
  }, [selectedSongs, titleSongIndex])

  return (
    <AlbumContext.Provider
      value={{
        albumName,
        setAlbumName,
        albumIntro,
        setAlbumIntro,
        selectedSongs,
        setSelectedSongs,
        titleSongIndex,
        setTitleSongIndex,
        selectedGenres,
        setSelectedGenres,
        selectedHashtags,
        setSelectedHashtags,
        selectedCover,
        setSelectedCover,
        selectedCoverFile,
        setSelectedCoverFile,
        images,
        setImages,
      }}
    >
      {children}
    </AlbumContext.Provider>
  )
}
