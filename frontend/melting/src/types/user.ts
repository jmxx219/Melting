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

export interface SongMypageDto {
  /** @format int64 */
  songId?: number
  albumCoverImageUrl?: string
  songType?: 'MELTING' | 'AICOVER'
  /** @format int32 */
  likeCount?: number
  isLiked?: boolean
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

export interface MemberSongResponseDto {
  mySongList?: SongListDto[]
  isPossibleAiCover?: boolean
}

export interface ApiResponseMemberSongResponseDto {
  status?: string
  data?: MemberSongResponseDto
  errorMessage?: string
}

export type GetMemberSongsData = ApiResponseMemberSongResponseDto

export type GetMemberSongsError = ErrorResponse
