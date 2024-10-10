import { albumApi } from '@/apis/albumApi.ts'
import AlbumDetailInfo from '@/components/Album/Detail/AlbumDetailInfo'
import { useUserInfo } from '@/hooks/useUserInfo'
import { AlbumDetailInfoType, AlbumDetailsResponseDto } from '@/types/album'
import { useEffect, useState } from 'react'
import AlbumCommentList from './AlbumCommentList'
import AlbumSong from './AlbumSong'

type AlbumDetailProps = {
  albumId: number
}

export default function AlbumDetail({ albumId }: AlbumDetailProps) {
  const [album, setAlbum] = useState<AlbumDetailsResponseDto | null>(null)
  const [albumDetailInfo, setAlbumDetailInfo] =
    useState<AlbumDetailInfoType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { data: userInfo } = useUserInfo()

  const convertAlbumDetailInfo = (album: AlbumDetailsResponseDto) => {
    const albumDetail: AlbumDetailInfoType = {
      albumCoverImage: album.albumCoverImageUrl, // 앨범 커버 이미지는 response에 없으므로, 별도로 받아와야 함
      albumName: album.albumName,
      likedCount: album.likedCount ?? 0, // likedCount가 없을 때 기본값 0
      commentCnt: album.commentCount ?? 0, // commentCount가 없을 때 기본값 0
      isLike: album.isLiked ?? false, // isLiked가 없을 때 기본값 false
      albumCreatorNickname: album.albumCreatorNickname,
      albumCreatorProfileImageUrl: album.albumCreatorProfileImageUrl,
      createdAt: album.createdAt,
      genres: album.genres,
      category: album.category,
      albumDescription: album.albumDescription,
      hashtags: album.hashtags,
    }
    return albumDetail
  }

  const fetchAlbumDetails = async () => {
    try {
      setLoading(true)
      const response = await albumApi.getAlbumDetails(albumId)
      const albumDetail = convertAlbumDetailInfo(response)
      setAlbum(response)
      setAlbumDetailInfo(albumDetail)
    } catch (error) {
      console.error('앨범 상세 조회 중 오류 발생:', error)
      setError('앨범 정보를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchAlbumDetails()
  }, [albumId])

  const fetchAlbum = async () => {
    const response = await albumApi.getAlbumDetails(albumId)
    const albumDetail = convertAlbumDetailInfo(response)
    setAlbum(response)
    setAlbumDetailInfo(albumDetail)
  }

  if (loading) {
    return <div>로딩 중...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!album) {
    return <div>앨범 정보를 찾을 수 없습니다.</div>
  }

  return (
    <div>
      {albumDetailInfo && (
        <div>
          <AlbumDetailInfo
            isCreator={
              userInfo?.nickname === album.albumCreatorNickname ? true : false
            }
            albumInfo={albumDetailInfo}
            albumId={albumId}
            fetchLike={fetchAlbum}
          />
        </div>
      )}
      <div>
        <AlbumSong songs={album.songs} fetchSong={fetchAlbum} />
      </div>
      <div>
        <AlbumCommentList
          commentCnt={album.commentCount || 0}
          comments={album.comments}
          albumId={album.albumId}
          fetchAlbum={fetchAlbum}
        />
      </div>
    </div>
  )
}
