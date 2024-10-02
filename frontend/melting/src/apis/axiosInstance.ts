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

export const createAxiosInstance = (apiPath: ApiPath): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${VITE_API_BASE_URL}${API_PATHS[apiPath]}`,
    withCredentials: true,
  })

  console.log(`${VITE_API_BASE_URL}${API_PATHS[apiPath]}`)

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
      if (error.response) {
        console.error('API 요청 오류:', error.response.data.message)
      } else {
        console.error('API 요청 오류:', error.message)
      }
      return Promise.reject(error)
    },
  )

  // HTTP 메서드 공통화
  const createMethod = <T = any, R = AxiosResponse<T>, D = any>(
    method: HttpMethod,
  ) => {
    return (url: string, data?: D, config?: AxiosRequestConfig) => {
      console.log(url)

      const requestConfig: AxiosRequestConfig = {
        ...config,
        method,
        url,
        // get, delete 메서드의 경우 쿼리 파라미터로 전달
        ...(method === 'get' || method === 'delete'
          ? { params: data } // 쿼리 파라미터는 params로 전달
          : { data }), // 나머지는 body로 전달
      }

      return instance.request<T, R>(requestConfig)
    }
  }

  instance.get = createMethod('get')
  instance.post = createMethod('post')
  instance.put = createMethod('put')
  instance.patch = createMethod('patch')
  instance.delete = createMethod('delete')

  return instance
}
