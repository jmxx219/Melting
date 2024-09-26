import { Api as MemberApi } from '@/typeApis/members/Api'
import { InitMemberInfoPayload } from '@/typeApis/members/data-contracts.ts'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
// API 인스턴스 생성
const memberApi = new MemberApi({
  // baseUrl: 'http://j11a701.p.ssafy.io:8080', // 실제 서버 주소로 변경해주세요
  baseURL: VITE_API_BASE_URL,
})

// 각 API 함수 구현
export const reissueToken = async () => {
  try {
    const response = await memberApi.reissue()
    return response.data
  } catch (error) {
    console.error('Token reissue failed:', error)
    throw error
  }
}

export const initMemberInfo = async (payload: InitMemberInfoPayload) => {
  try {
    const response = await memberApi.initMemberInfo(payload)
    return response.data
  } catch (error) {
    console.error('Init member info failed:', error)
    throw error
  }
}

export const validateNickname = async (nickname: string) => {
  try {
    const response = await memberApi.validateNickname({ nickname })
    return response.data
  } catch (error) {
    console.error('Nickname validation failed:', error)
    throw error
  }
}

export const logout = async () => {
  try {
    const response = await memberApi.logout()
    return response.data
  } catch (error) {
    console.error('Logout failed:', error)
    throw error
  }
}
