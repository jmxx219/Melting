import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

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

interface CustomInstance extends AxiosInstance {
  request<T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>,
  ): Promise<R>
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>
  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>
  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>
  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>
  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>
}

export const createAxiosInstance = (apiPath: ApiPath): CustomInstance => {
  const instance = axios.create({
    baseURL: `${VITE_API_BASE_URL}${API_PATHS[apiPath]}`,
    withCredentials: true,
  }) as CustomInstance

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

  const createMethod = <T = any, R = AxiosResponse<T>, D = any>(
    method: HttpMethod,
  ) => {
    return (url: string, data?: D, config?: AxiosRequestConfig) => {
      const requestConfig: AxiosRequestConfig = {
        ...config,
        method,
        url,
      }

      if (
        data &&
        (method === 'post' || method === 'put' || method === 'patch')
      ) {
        requestConfig.data = data
      } else if (data && (method === 'get' || method === 'delete')) {
        requestConfig.params = data
      }

      return instance.request<T, R>(requestConfig)
    }
  }

  // HTTP 메서드 공통화
  instance.get = createMethod('get')
  instance.post = createMethod('post')
  instance.put = createMethod('put')
  instance.patch = createMethod('patch')
  instance.delete = createMethod('delete')

  return instance
}
