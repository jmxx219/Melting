import { ApiResponseString, ErrorResponse } from '@/types/globalType.ts'

export interface user {
  id: number
  socialType: string
  email: string
  nickname: string
  gender: string
  profileImage: string
}

export interface MemberUpdateRequestDto {
  nickname?: string
}

export interface MemberInitRequestDto {
  nickname: string
  gender: string
}

export interface MemberResponseDto {
  nickname: string
  profileImageUrl: string
}

export interface ApiResponseBoolean {
  status?: string
  data?: boolean
  errorMessage?: string
}

export interface ApiResponseVoid {
  status?: string
  data?: object
  errorMessage?: string
}

export interface ApiResponseMemberResponseDto {
  status?: string
  data?: MemberResponseDto
  errorMessage?: string
}

export interface ApiResponseAlbumMyPageResponseDto {
  status?: string
  data?: AlbumMyPageResponseDto
  errorMessage?: string
}

export interface AlbumMyPageResponseDto {
  albumInfoList: AlbumMyResponseDto[]
  isLast: boolean
  /** @format int32 */
  pageNumber: number
  /** @format int32 */
  pageSize: number
  /** @format int32 */
  totalPages: number
  /** @format int64 */
  totalElements: number
  /** @format int32 */
  numberOfElements: number
}

export interface AlbumMyResponseDto {
  /** @format int64 */
  albumId: number
  albumName: string
  albumCoverImageUrl: string
  creatorNickname: string
  /** @format date-time */
  createdAt: string
  isPublic: boolean
  isLiked: boolean
  /** @format int32 */
  likedCount: number
}

export type ReissueData = ApiResponseString

export type ReissueError = ErrorResponse

export interface InitMemberInfoPayload {
  /** @format binary */
  multipartFile?: File | null
  memberInitRequestDto?: MemberInitRequestDto
}

export type InitMemberInfoData = ApiResponseMemberResponseDto

export type InitMemberInfoError = ErrorResponse

export type ValidateNicknameData = ApiResponseBoolean

export type ValidateNicknameError = ErrorResponse

export type LogoutData = ApiResponseVoid

export type LogoutError = ErrorResponse

export type GetMemberInfoData = MemberResponseDto

export type GetMemberInfoError = ErrorResponse

export interface MemberUpdateRequestDto {
  nickname?: string
}

export interface UpdateMemberInfoPayload {
  /** @format binary */
  multipartFile: File | null
  memberUpdateRequestDto: MemberUpdateRequestDto
}

export type UpdateMemberInfoData = ApiResponseMemberResponseDto

export type UpdateMemberInfoError = ErrorResponse

export type GetMemberAlbumsData = ApiResponseAlbumMyPageResponseDto

export type GetMemberLikesAlbumsData = ApiResponseAlbumMyPageResponseDto

export type GetMemberAlbumsError = ErrorResponse

export type GetMemberLikesAlbumsError = ErrorResponse

export interface SongMypageDto {
  /** @format int64 */
  songId: number
  albumCoverImageUrl?: string
  songType: 'MELTING' | 'AICOVER'
  /** @format int32 */
  likeCount: number
  isLiked: boolean
  isCreated?: boolean
  /** @format date-time */
  lastModifiedAt?: string
}

export interface SongListDto {
  /** @format int64 */
  originalSongId?: number
  songTitle?: string
  artist?: string
  songList?: SongMypageDto[]
}

export interface MemberSongCountsResponseDto {
  /** @format int32 */
  songcounts: number
}

export interface ApiResponseMemberSongCountsResponseDto {
  status?: string
  data?: MemberSongCountsResponseDto
  errorMessage?: string
}

export interface ApiResponseSongMypagePageResponseDto {
  status?: string
  data?: SongMypagePageResponseDto
  errorMessage?: string
}

export interface SongMypagePageResponseDto {
  mySongList?: SongListDto[]
  isPossibleAiCover?: boolean
  isLast?: boolean
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  /** @format int32 */
  totalPages?: number
  /** @format int64 */
  totalElements?: number
  /** @format int32 */
  numberOfElements?: number
}

export type GetMemberSongsData = ApiResponseSongMypagePageResponseDto

export type GetMemberSongsError = ErrorResponse

export type GetMeltingCountsData = ApiResponseMemberSongCountsResponseDto

export type GetMeltingCountsError = ErrorResponse

export interface ApiResponseSongLikesPageResponseDto {
  status?: string
  data?: SongLikesPageResponseDto
  errorMessage?: string
}

export interface SongLikesPageResponseDto {
  songLikesList: SongLikesResponseDto[]
  isLast?: boolean
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  /** @format int32 */
  totalPages?: number
  /** @format int64 */
  totalElements?: number
  /** @format int32 */
  numberOfElements?: number
}

export interface SongLikesResponseDto {
  /** @format int64 */
  songId: number
  title: string
  albumCoverImageUrl: string
  creatorNickname: string
  artist: string
  isLiked: boolean
  /** @format int32 */
  likedCount: number
  /** @format int32 */
  lengthInSeconds: number
}

export type GetMemberLikesSongsData = ApiResponseSongLikesPageResponseDto
