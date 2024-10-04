import { OriginalSongSearchResponseDto } from '@/typeApis/data-contracts'
import { CoverType } from './constType'
import { ErrorResponse } from '@/types/globalType.ts'

export type Song = {
  songId: number
  songTitle: string
  artist: string
  albumCoverImageUrl: string
  nickname: string
  songType: CoverType
  meltingSongId: number | null
  aiCoverSongId: number | null
}

export interface SongListProps {
  songs: OriginalSongSearchResponseDto[] | undefined
  showNumbers: boolean
  selectId?: number
}

export type LikedSongType = {
  songId: number
  albumCoverImgUrl: string
  artist: string
  songTitle: string
  nickname: string
  executionTime: string
  likeCount: number
  isLiked: boolean
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

export type GetSongsForAlbumCreationData = ApiResponseSongSearchPageResponseDto

export type GetSongsForAlbumCreationError = ErrorResponse
