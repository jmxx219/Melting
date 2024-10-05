import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type ApiPath = 'members' | 'albums' | 'songs' | 'originalSongs' | 'hashtags'

const API_PATHS: Record<ApiPath, string> = {
  members: import.meta.env.VITE_API_MEMBERS_PATH,
  albums: import.meta.env.VITE_API_ALBUMS_PATH,
  songs: import.meta.env.VITE_API_SONGS_PATH,
  originalSongs: import.meta.env.VITE_API_ORIGINAL_SONGS_PATH,
  hashtags: import.meta.env.VITE_API_HASHTAGS_PATH,
}

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

interface ApiResponse<T = any> {
  data: T
  message: string
  status: number
}

interface CustomError {
  message: string
  status: number
  data?: any
}

export const createAxiosInstance = (apiPath: ApiPath): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${VITE_API_BASE_URL}${API_PATHS[apiPath]}`,
    withCredentials: true,
    timeout: 60000, // 60초 타임아웃 설정
  })

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      // 토큰 추가 등의 로직을 넣을 수 있습니다.
      return config
    },
    (error) => Promise.reject(error),
  )

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      // ApiResponse 형식으로 데이터를 변환하여 반환
      // access 토큰 로직 처리
      return {
        ...response,
        data: response.data as ApiResponse,
      }
    },
    (error: AxiosError<ApiResponse>) => {
      const customError: CustomError = {
        message:
          error.response?.data?.message || 'An unexpected error occurred',
        status: error.response?.status || 500,
        data: error.response?.data,
      }
      console.error('API 요청 오류:', customError.message)

      if (error.response?.status === 401) {
        window.location.href = '/login' // 로그인 페이지로 리다이렉트
      }

      return Promise.reject(customError)
    },
  )

  return instance
}

// 타입 안전성을 갖춘 API 메서드들
export const createApi = <T>(axiosInstance: AxiosInstance) => ({
  get: <R = T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance
      .get<ApiResponse<R>>(url, config)
      .then((response) => response.data),

  post: <R = T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance
      .post<ApiResponse<R>>(url, data, config)
      .then((response) => response.data),

  put: <R = T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance
      .put<ApiResponse<R>>(url, data, config)
      .then((response) => response.data),

  patch: <R = T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance
      .patch<ApiResponse<R>>(url, data, config)
      .then((response) => response.data),

  delete: <R = T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance
      .delete<ApiResponse<R>>(url, config)
      .then((response) => response.data),
})

export type { ApiResponse, CustomError, HttpMethod, ApiPath }
