import { Song } from './song'
import { ErrorResponse, ApiResponseInteger } from '@/types/globalType.ts'
import { ApiResponseMemberResponseDto } from '@/types/user.ts'

export interface AlbumForm {
  tracks: Song[]
  albumName: string
  albumDescription: string
  genre: string[]
  hashtags: string[]
  albumCoverImage: File | null
}

export interface BestAlbum {
  albumId: number
  albumName: string
  nickname: string
  albumCoverImage: string
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
  album_id?: number
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
  comment_id?: number
  writer_profile_image?: string
  writer_nickname?: string
  content?: string
  /** @format date-time */
  created_at?: string
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
