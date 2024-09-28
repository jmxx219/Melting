import axios, { AxiosInstance } from 'axios'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type ApiPath = 'members' | 'albums' | 'songs' | 'originalSongs' | 'hashtags'

const API_PATHS: Record<ApiPath, string> = {
  members: import.meta.env.VITE_API_MEMBERS_PATH,
  albums: import.meta.env.VITE_API_ALBUMS_PATH,
  songs: import.meta.env.VITE_API_SONGS_PATH,
  originalSongs: import.meta.env.VITE_API_ORIGINAL_SONGS_PATH,
  hashtags: import.meta.env.VITE_API_HASHTAGS_PATH,
}
export const createAxiosInstance = (apiPath: ApiPath): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${VITE_API_BASE_URL}${API_PATHS[apiPath]}`,
    withCredentials: true,
  })

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      // 여기에 토큰 추가 등의 로직을 넣을 수 있습니다.
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.error('API 요청 오류:', error)
      return Promise.reject(error)
    },
  )

  return instance
}
