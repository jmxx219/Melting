import { FullRequestParams } from '@/typeApis/http-client.ts'

export interface SVGIconProps {
  width?: number
  height?: number
  fill?: string
}

export interface ErrorResponse {
  errorMessage?:
    | 'MEMBER_NOT_FOUND'
    | 'DUPLICATE_NICKNAME'
    | 'INCORRECT_IMAGE_EXTENSION'
    | 'MEMBER_BAD_REQUEST'
    | 'MEMBER_HASHTAG_FULL'
    | 'MEMBER_HASHTAG_EMPTY'
    | 'MEMBER_HASHTAG_EXIST'
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
    | 'INVALID_FILE_TYPE'
    | 'ALBUM_SONGS_EMPTY_ERROR'
}

export interface ApiResponseInteger {
  status?: string
  /** @format int32 */
  data?: number
  errorMessage?: string
}

export interface ApiResponseString {
  status?: string
  data?: string
  errorMessage?: string
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>
