import { Song } from './song'
import {
  ErrorResponse,
  ApiResponseInteger,
  ApiResponseString,
  ApiResponseBoolean,
  ApiResponseVoid,
} from '@/types/globalType.ts'
import { ApiResponseMemberResponseDto } from '@/types/user.ts'
import { albumCategoryType } from './constType'

export interface AlbumForm {
  tracks: Song[]
  albumName: string
  albumDescription: string
  genre: string[]
  hashtags: string[]
  albumCoverImage: File | null
}

export interface ImageInfo {
  id: string
  url: string
  file: File | null
  description: string
  type: 'user' | 'ai' | 'default'
}

export interface AlbumCreateRequestDto {
  albumName: string
  albumDescription: string
  songs: number[]
  /** @format int64 */
  titleSongId: number
  genres: string[]
  hashtags: string[]
  /** @format int32 */
  defaultCoverNumber?: number
}

export interface CreateAlbumPayload {
  albumCreateRequestDto: AlbumCreateRequestDto
  /** @format binary */
  albumCoverImage: File
}

export interface AlbumMainResponseDto {
  album_cover_image?: string
  album_name?: string
  nickname?: string
}

export interface ApiResponseListAlbumMainResponseDto {
  status?: string
  data?: AlbumMainResponseDto[]
  errorMessage?: string
}

export interface AlbumUpdateResponseDto {
  /** @format int64 */
  albumId: number
}

export interface ApiResponseAlbumUpdateResponseDto {
  status?: string
  data?: AlbumUpdateResponseDto
  errorMessage?: string
}

export interface CommentRequestDto {
  content?: string
}

export interface ApiResponseCommentResponseDto {
  status?: string
  data?: CommentResponseDto
  errorMessage?: string
}

export interface CommentResponseDto {
  /** @format int64 */
  commentId?: number
  writerProfileImage: string
  writerNickname: string
  content: string
  isMyComment: boolean
  /** @format date-time */
  createdAt: string
}

export interface ApiResponseListCommentResponseDto {
  status?: string
  data?: CommentResponseDto[]
  errorMessage?: string
}

export type GetAlbumsInCommunityMainPageData =
  ApiResponseListAlbumMainResponseDto

export type GetAlbumsInCommunityMainPageError = ErrorResponse

export type CreateAlbumData = ApiResponseAlbumUpdateResponseDto

export type CreateAlbumError = ErrorResponse

export type GetAlbumLikesCountData = ApiResponseInteger

export type GetAlbumLikesCountError = ErrorResponse

export type AddAlbumLikesData = ApiResponseInteger

export type AddAlbumLikesError = ErrorResponse

export type DeleteAlbumLikesData = ApiResponseInteger

export type DeleteAlbumLikesError = ErrorResponse

export type GetAllCommentsData = ApiResponseListCommentResponseDto

export type GetAllCommentsError = ErrorResponse

export type WriteCommentData = ApiResponseCommentResponseDto

export type WriteCommentError = ErrorResponse

export type GetMemberInfoData = ApiResponseMemberResponseDto

export type GetMemberInfoError = ErrorResponse

export interface AlbumDetailType {
  albumInfo: AlbumDetailInfoType
  albumId: number
  songs: AlbumSongType[]
  comments: AlbumCommentType[]
  commentCnt: number
}

export interface AlbumDetailInfoType {
  albumCoverImage: string
  albumName: string
  likedCount: number
  commentCnt: number
  isLike: boolean
  albumCreatorNickname: string
  albumCreatorProfileImageUrl: string
  createdAt: string
  genres: string[]
  category: albumCategoryType
  albumDescription: string
  hashtags: string[]
}

export type AlbumSongType = Song & {
  isTitle: boolean
}

export type AlbumCommentType = {
  commentId: number
  member: string
  content: string
  createdAt: string
  profileImg: string
  isMyComment: boolean
}

export interface ApiResponseListGenreResponseDto {
  status?: string
  data?: GenreResponseDto[]
  errorMessage?: string
}

export interface GenreResponseDto {
  /** @format int64 */
  id?: number
  content?: string
}

export type GetAllGenresData = ApiResponseListGenreResponseDto

export type GetAllGenresError = ErrorResponse

export interface AlbumRankingResponseDto {
  /** @format int64 */
  albumId: number
  albumName: string
  creatorNickname: string
  albumCoverImageUrl: string
}

export interface ApiResponseListAlbumRankingResponseDto {
  status?: string
  data?: AlbumRankingResponseDto[]
  errorMessage?: string
}

export type GetSteadyAlbumsData = ApiResponseListAlbumRankingResponseDto

export type GetSteadyAlbumsError = ErrorResponse

export type GetMonthlyAlbumsData = ApiResponseListAlbumRankingResponseDto

export type GetMonthlyAlbumsError = ErrorResponse

export type GetHot5AlbumsData = ApiResponseListAlbumRankingResponseDto

export type GetHot5AlbumsError = ErrorResponse

export interface SongDetailsResponseDto {
  /** @format int64 */
  songId: number
  songTitle: string
  nickname: string
  artist: string
  albumCoverImageUrl: string
  isLiked: boolean
  /** @format int32 */
  likedCount: number
  songUrl?: string
  lyrics?: string
  lengthInSeconds: number
}

export interface AlbumDetailsResponseDto {
  /** @format int64 */
  albumId: number
  albumName: string
  albumCreatorNickname: string
  albumCreatorProfileImageUrl: string
  albumCoverImageUrl: string
  albumDescription: string
  /** @format date-time */
  createdAt: string
  category: 'SINGLE' | 'MINI' | 'LP'
  songs: SongDetailsResponseDto[]
  hashtags: string[]
  genres: string[]
  comments: CommentResponseDto[]
  /** @format int32 */
  commentCount?: number
  isLiked?: boolean
  /** @format int32 */
  likedCount?: number
}

export interface ApiResponseAlbumDetailsResponseDto {
  status?: string
  data?: AlbumDetailsResponseDto
  errorMessage?: string
}

export type GetAlbumDetailsData = ApiResponseAlbumDetailsResponseDto

export type GetAlbumDetailsError = ErrorResponse

export interface AiCoverImageRequestDto {
  songs: number[]
}

export type CreateAiAlbumCoverImageData = ApiResponseString

export type CreateAiAlbumCoverImageError = ErrorResponse

export type ToggleIsPublicData = ApiResponseBoolean

export type DeleteAlbumData = ApiResponseVoid

export interface AiDescriptionRequestDto {
  songs: number[]
  hashtags: string[]
  genres: string[]
  albumName: string
}

export type CreateAiDescriptionData = ApiResponseString

export type CreateAiDescriptionError = ErrorResponse
