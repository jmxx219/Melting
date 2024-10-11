import { ErrorResponse } from '@/types/globalType.ts'

export interface HashtagResponseDto {
  /** @format int64 */
  id: number
  content: string
}
export interface HashtagPageResponseDto {
  hashtags?: HashtagResponseDto[]
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
export interface ApiResponseHashtagPageResponseDto {
  status?: string
  data?: HashtagPageResponseDto
  errorMessage?: string
}

export type SearchHashtagsData = ApiResponseHashtagPageResponseDto

export type SearchHashtagsError = ErrorResponse
