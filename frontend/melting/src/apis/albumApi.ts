import {
  createAxiosInstance,
  createApi,
  ApiResponse,
  CustomError,
} from './axiosInstance'
import { GenreResponseDto, GetAllGenresData } from '@/types/album.ts'

const instance = createAxiosInstance('albums')
const api = createApi<ApiResponse>(instance)

export const albumApi = {
  getAllGenres: async (): Promise<GenreResponseDto[]> => {
    try {
      const response = await api.get<GetAllGenresData>('/genres')
      if (response.data && Array.isArray(response.data)) {
        return response.data
      } else {
        return [] // 데이터가 없거나 형식이 맞지 않으면 빈 배열 반환
      }
    } catch (error) {
      console.error('장르 목록 가져오기 오류:', error)
      throw error as CustomError
    }
  },
}

export async function searchHashtags(query: string): Promise<string[]> {
  // 실제 API 호출 로직을 여기에 구현합니다.
  // 예시 코드:
  // const response = await fetch(`/api/hashtags?query=${encodeURIComponent(query)}`);
  // const data = await response.json();
  // return data.hashtags;
  return ['사진', '사랑해', '사랑합니다', '사진스타그램'].filter((tag) =>
    tag.includes(query),
  )
}
