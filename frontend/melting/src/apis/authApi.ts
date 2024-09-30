import { createAxiosInstance } from '@/apis/axiosInstance.ts'
import { ReissueData, ReissueError } from '@/types/user'

const VITE_LOCAL_URL = import.meta.env.VITE_LOCAL_URL
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const axiosInstance = createAxiosInstance('members')

export default function login(provider: 'kakao' | 'google') {
  window.location.assign(
    `${VITE_API_BASE_URL}/oauth2/authorize/${provider}?redirect_url=${VITE_LOCAL_URL}/login/callback`,
  )
}

export const reissue = async (params?: any): Promise<ReissueData> => {
  try {
    const response = await axiosInstance.post<ReissueData>(`/reissue`, params)
    return response.data // 응답 데이터 반환
  } catch (error: any) {
    console.error('Token reissue error:', error)
    // 에러 처리, 예를 들어 API에서 반환된 오류 메시지를 반환할 수 있습니다.
    if (error.response) {
      throw error.response.data as ReissueError
    } else {
      throw new Error('Unexpected error occurred')
    }
  }
}
