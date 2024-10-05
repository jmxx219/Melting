import {
  OriginalSongResponseDto,
  OriginalSongSearchResponseDto,
} from '@/types/song'
import {
  ApiResponse,
  createApi,
  createAxiosInstance,
  CustomError,
} from '../axiosInstance'

const instance = createAxiosInstance('originalSongs')
const api = createApi<ApiResponse>(instance)

type PageSongSearchDto = {
  isLast: boolean
  numberOfElements: number
  originalSongPage: OriginalSongSearchResponseDto[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
}

export const musicApi = {
  originSongList: async (
    keyword: string,
    page?: number,
  ): Promise<PageSongSearchDto> => {
    try {
      const response = await api.get<PageSongSearchDto>(
        `/original-songs?keyword=${encodeURIComponent(keyword)}&page=${page}&size=10`,
      )
      return response.data
    } catch (error) {
      throw error as CustomError
    }
  },
  originalSongDetail: async (
    songId?: number,
  ): Promise<OriginalSongResponseDto> => {
    try {
      const response = await api.get<OriginalSongResponseDto>(
        `/original-songs/${songId}`,
      )
      return response.data
    } catch (error) {
      throw error as CustomError
    }
  },
}
