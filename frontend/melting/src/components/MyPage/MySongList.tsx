import { useState, useEffect } from 'react'
import MySongContent from '@/components/MyPage/MySongContent'
import { SortType } from '@/types/constType'
import { SongListDto, SongMypageDto } from '@/types/user'
import { userApi } from '@/apis/userApi'

interface AlbumSongToggleProps {
  sortOption: SortType
}

export default function MySongList({ sortOption }: AlbumSongToggleProps) {
  const [originalSongs, setOriginalSongs] = useState<SongListDto[]>([])
  const [isPossibleAiCover, setIsPossibleAiCover] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  // const [isLast, setIsLast] = useState(false)

  const fetchMySongs = async () => {
    setLoading(true)
    try {
      const response = await userApi.getMemberSongs()
      if (response.mySongList) {
        setOriginalSongs(response.mySongList)
      }
      console.log(response)
      setIsPossibleAiCover(response.isPossibleAiCover ?? false)
      // setIsLast(response.isLast || false)
    } catch (error) {
      console.error('Error fetching songs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMySongs()
  }, [sortOption])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {originalSongs.map((originalSong) => (
        <MySongContent
          key={originalSong.originalSongId}
          originalSong={originalSong}
          isPossibleAiCover={isPossibleAiCover}
        />
      ))}
    </div>
  )
}
