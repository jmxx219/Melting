/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ErrorResponse {
  errorMessage?:
    | 'MEMBER_NOT_FOUND'
    | 'DUPLICATE_NICKNAME'
    | 'INCORRECT_IMAGE_EXTENSION'
    | 'MEMBER_BAD_REQUEST'
    | 'MEMBER_HASHTAG_FULL'
    | 'MEMBER_HASHTAG_EMPTY'
    | 'MEMBER_HASHTAG_EXIST'
    | 'MEMBER_HASHTAG_BAD_REQUEST'
    | 'SONG_NOT_FOUND'
    | 'SONG_ALREADY_INCLUDED'
    | 'GENRE_NOT_FOUND'
    | 'HASHTAG_NOT_FOUND'
    | 'ALBUM_NOT_FOUND'
    | 'INVALID_SORT_CRITERIA'
    | 'INVALID_SONG_COUNT'
    | 'SEARCH_QUERY_TOO_SHORT'
    | 'ALBUM_NAME_BLANK_ERROR'
    | 'ALBUM_COVER_IMAGE_BLANK_ERROR'
    | 'ALBUM_LIKES_NOT_FOUND'
    | 'REDIS_SCORE_EMPTY'
    | 'SONG_LIKES_NOT_FOUND'
    | 'INVALID_FILE_TYPE'
    | 'ALBUM_SONGS_EMPTY_ERROR'
}

export interface ApiResponseListString {
  status?: string
  data?: string[]
  errorMessage?: string
}

export interface MemberUpdateRequestDto {
  nickname?: string
}

export interface ApiResponseMemberResponseDto {
  status?: string
  data?: MemberResponseDto
  errorMessage?: string
}

export interface MemberResponseDto {
  nickname?: string
  profileImageUrl?: string
}

export interface MemberInitRequestDto {
  nickname?: string
  gender?: string
}

export interface ApiResponseBoolean {
  status?: string
  data?: boolean
  errorMessage?: string
}

export interface ApiResponseSongMypagePageResponseDto {
  status?: string
  data?: SongMypagePageResponseDto
  errorMessage?: string
}

export interface SongListDto {
  /** @format int64 */
  originalSongId?: number
  songTitle?: string
  artist?: string
  songList?: SongMypageDto[]
}

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

export interface ApiResponseMemberSongCountsResponseDto {
  status?: string
  data?: MemberSongCountsResponseDto
  errorMessage?: string
}

export interface MemberSongCountsResponseDto {
  /** @format int32 */
  songcounts?: number
}

export interface ApiResponseSongLikesPageResponseDto {
  status?: string
  data?: SongLikesPageResponseDto
  errorMessage?: string
}

export interface SongLikesPageResponseDto {
  songLikesList?: SongLikesResponseDto[]
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
  songId?: number
  title?: string
  albumCoverImageUrl?: string
  creatorNickname?: string
  artist?: string
  isLiked?: boolean
  /** @format int32 */
  likedCount?: number
  /** @format int32 */
  lengthInSeconds?: number
}

export interface AlbumMyPageResponseDto {
  albumInfoList?: AlbumMyResponseDto[]
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

export interface AlbumMyResponseDto {
  /** @format int64 */
  albumId?: number
  albumName?: string
  albumCoverImageUrl?: string
  creatorNickname?: string
  /** @format date-time */
  createdAt?: string
  isPublic?: boolean
  isLiked?: boolean
  /** @format int32 */
  likedCount?: number
}

export interface ApiResponseAlbumMyPageResponseDto {
  status?: string
  data?: AlbumMyPageResponseDto
  errorMessage?: string
}

export interface ApiResponseVoid {
  status?: string
  data?: object
  errorMessage?: string
}

export type GetMemberHashtagsData = ApiResponseListString

export type GetMemberHashtagsError = ErrorResponse

export type AddMemberHashtagData = ApiResponseListString

export type AddMemberHashtagError = ErrorResponse

export type DeleteMemberHashtagData = ApiResponseListString

export type DeleteMemberHashtagError = ErrorResponse

export type GetMemberInfoData = ApiResponseMemberResponseDto

export type GetMemberInfoError = ErrorResponse

export interface UpdateMemberInfoPayload {
  /** @format binary */
  multipartFile?: File
  memberUpdateRequestDto: MemberUpdateRequestDto
}

export type UpdateMemberInfoData = ApiResponseMemberResponseDto

export type UpdateMemberInfoError = ErrorResponse

export interface InitMemberInfoPayload {
  /** @format binary */
  multipartFile?: File
  memberInitRequestDto: MemberInitRequestDto
}

export type InitMemberInfoData = ApiResponseMemberResponseDto

export type InitMemberInfoError = ErrorResponse

export type ValidateNicknameData = ApiResponseBoolean

export type ValidateNicknameError = ErrorResponse

export type GetMemberSongsData = ApiResponseSongMypagePageResponseDto

export type GetMemberSongsError = ErrorResponse

export type GetMeltingCountsData = ApiResponseMemberSongCountsResponseDto

export type GetMeltingCountsError = ErrorResponse

export type GetMemberLikesSongsData = ApiResponseSongLikesPageResponseDto

export type GetMemberLikesSongsError = ErrorResponse

export type GetMemberLikesAlbumsData = ApiResponseAlbumMyPageResponseDto

export type GetMemberLikesAlbumsError = ErrorResponse

export type GetMemberAlbumsData = ApiResponseAlbumMyPageResponseDto

export type GetMemberAlbumsError = ErrorResponse

export type LogoutData = ApiResponseVoid

export type LogoutError = ErrorResponse
