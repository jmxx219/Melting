import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios'
import { setLoading } from '@/contexts/LoadingContext'

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

const axiosDefaults: AxiosRequestConfig = {
  withCredentials: true,
  timeout: 60000,
}

export const createAxiosInstance = (apiPath: ApiPath): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${VITE_API_BASE_URL}${API_PATHS[apiPath]}`,
    ...axiosDefaults,
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
    (response) => {
      setLoading(false)
      return {
        ...response,
        data: response.data as ApiResponse,
      }
    },
    (error: AxiosError<ApiResponse>) => {
      setLoading(false)
      return handleAxiosError(error)
    },
  )

  return instance
}

const handleUnauthorized = () => {
  window.location.href = '/login' // 로그인 페이지로 리다이렉트
}

const handleAxiosError = (error: AxiosError<ApiResponse>): Promise<never> => {
  const customError: CustomError = {
    message: error.response?.data?.message || 'An unexpected error occurred',
    status: error.response?.status || 500,
    data: error.response?.data,
  }
  console.error('API 요청 오류:', customError.message)

  if (customError.status === 401) {
    handleUnauthorized()
  }

  return Promise.reject(customError)
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
