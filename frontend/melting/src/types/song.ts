import { ErrorResponse, ApiResponseInteger } from '@/types/globalType.ts'
import { CoverType } from './constType'
import { ApiResponseBoolean } from './user'
import { SongDetailsResponseDto } from './album'

export type Song = {
  songId: number
  songTitle: string
  artist: string
  albumCoverImageUrl: string
  nickname: string
  songType?: CoverType
  meltingSongId?: number | null
  aiCoverSongId?: number | null
  likedCount: number
  isLiked: boolean
  lengthInSeconds: number
  songUrl?: string
}

export interface SongListProps {
  songs: OriginalSongSearchResponseDto[] | undefined
  showNumbers: boolean
  selectId?: number
}
export interface ApiResponseSongDetailsResponseDto {
  status?: string
  data: SongDetailsResponseDto
  errorMessage?: string
}

export interface SongSearchResponseDto {
  originalSongTitle: string
  originalSongArtist: string
  albumCoverImage: string
  /** @format int64 */
  meltingSongId?: number
  /** @format int64 */
  aiCoverSongId?: number
}

export interface SongSearchPageResponseDto {
  songSearchResponseDtoList?: SongSearchResponseDto[]
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

export interface ApiResponseSongSearchPageResponseDto {
  status?: string
  data?: SongSearchPageResponseDto
  errorMessage?: string
}

export interface OriginalSongResponseDto {
  /** @format int64 */
  originalSongId: number
  title: string
  artist: string
  albumCoverUrl: string
  mrUrl: string
  lyrics: string
}

export type AddSongLikesData = ApiResponseInteger

export type DeleteSongLikesData = ApiResponseInteger
export interface OriginalSongSearchResponseDto {
  /** @format int64 */
  originalSongId: number
  title: string
  artist: string
  coverImageUrl: string
}

export type GetSongsForAlbumCreationData = ApiResponseSongSearchPageResponseDto

export type GetSongsForAlbumCreationError = ErrorResponse

export type CreateAicoverSongData = ApiResponseBoolean

export type CreateAicoverSongError = ErrorResponse

export type GetSongDetailsData = ApiResponseSongDetailsResponseDto

export type GetSongDetailsError = ErrorResponse
