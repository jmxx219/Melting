import { createAxiosInstance, createApi, ApiResponse } from './axiosInstance'
import {
  HashtagPageResponseDto,
  SearchHashtagsData,
  SearchHashtagsError,
} from '@/types/hashtag.ts'

const instance = createAxiosInstance('hashtags')
const api = createApi<ApiResponse>(instance)

export const hashtagApi = {
  searchHashtags: async (
    keyword: string | null,
    page?: number,
    size?: number,
  ): Promise<HashtagPageResponseDto> => {
    try {
      const response = await api.get<SearchHashtagsData>('', {
        params: {
          keyword,
          page,
          size,
        },
      })
      return response.data as HashtagPageResponseDto
    } catch (error) {
      console.error('해시태그 조회 중 오류 발생:', error)
      throw error as SearchHashtagsError // 오류 처리
    }
  },
}
