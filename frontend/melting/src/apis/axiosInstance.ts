import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
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

export const createAxiosInstance = (
  apiPath: ApiPath,
  // setIsLoading: (isLoading: boolean) => void,
): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${VITE_API_BASE_URL}${API_PATHS[apiPath]}`,
    ...axiosDefaults,
  })
  const requests: Record<string, any> = {}

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      const key = `${config.method}:${config.url}`
      if (requests[key]) {
        return Promise.reject(new Error('중복된 요청입니다.'))
      }
      requests[key] = true
      // setIsLoading(true)
      return config
    },
    (error) => {
      // setIsLoading(false)
      return Promise.reject(error)
    },
  )

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => {
      // setIsLoading(false)
      const key = `${response.config.method}:${response.config.url}`
      delete requests[key]
      return {
        ...response,
        data: response.data as ApiResponse,
      }
    },
    (error: AxiosError<ApiResponse>) => {
      // setIsLoading(false)
      const key = `${error.config?.method}:${error.config?.url}`
      delete requests[key]
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
