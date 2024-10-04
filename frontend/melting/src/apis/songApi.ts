import {
  ApiResponse,
  createApi,
  createAxiosInstance,
  CustomError,
} from './axiosInstance'

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios'

const instance = createAxiosInstance('songs')
const api = createApi<ApiResponse>(instance)

export const songApi = {
  meltingApi: async (
    originalSongId: number, // 원곡 ID
    voiceBlob: Blob,
  ): Promise<object> => {
    try {
      // FormData 생성
      const formData = new FormData()
      formData.append('originalSongId', String(originalSongId)) // songId 추가
      formData.append('voiceFile', voiceBlob, 'voiceFile.webm') // voiceFile 추가

      const response = axios.post(
        'http://70.12.246.171:8080/api/v1/songs/melting',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data', // multipart 설정
          },
        },
      )

      // API 호출
      // const response = await api.post<object>('/melting', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data', // multipart 설정
      //   },
      // })

      console.log(response)

      return response
    } catch (error) {
      throw error as CustomError
    }
  },
}
