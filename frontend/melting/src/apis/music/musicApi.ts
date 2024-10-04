import {
  OriginalSongResponseDto,
  PageOriginalSongSearchResponseDto,
} from '@/typeApis/data-contracts'
import {
  ApiResponse,
  createApi,
  createAxiosInstance,
  CustomError,
} from '../axiosInstance'

const instance = createAxiosInstance('originalSongs')
const api = createApi<ApiResponse>(instance)

export const musicApi = {
  originSongList: async (
    keyword: string,
    page?: number,
  ): Promise<PageOriginalSongSearchResponseDto> => {
    try {
      const response = await api.get<PageOriginalSongSearchResponseDto>(
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
