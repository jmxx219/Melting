import { createAxiosInstance, createApi, ApiResponse } from './axiosInstance'

const instance = createAxiosInstance('hashtags')
const api = createApi<ApiResponse>(instance)

export const hashtagApi = {
  searchHashtags: async (
    keyword: string | null,
    page?: number,
    size?: number,
  ): Promise<SearchHashtagsData> => {
    try {
      const response = await instance.get<SearchHashtagsData>(
        '/api/v1/hashtags',
        {
          params: {
            keyword,
            page,
            size,
          },
        },
      )
      return response.data
    } catch (error) {
      console.error('해시태그 조회 중 오류 발생:', error)
      throw error // 오류 처리
    }
  },
}
