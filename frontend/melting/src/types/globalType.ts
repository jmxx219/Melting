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
    | 'ALBUM_NOT_FOUND'
    | 'INVALID_SORT_CRITERIA'
    | 'INVALID_SONG_COUNT'
    | 'SEARCH_QUERY_TOO_SHORT'
    | 'ALBUM_NAME_BLANK_ERROR'
    | 'ALBUM_COVER_IMAGE_BLANK_ERROR'
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

export interface ApiResponseBoolean {
  status: string
  data: boolean
  errorMessage?: string
}

export interface ApiResponseVoid {
  status?: string
  data?: object
  errorMessage?: string
}
