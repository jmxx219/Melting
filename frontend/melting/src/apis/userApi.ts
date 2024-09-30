import {
  createAxiosInstance,
  createApi,
  ApiResponse,
  CustomError,
} from './axiosInstance'
import {
  InitMemberInfoPayload,
  InitMemberInfoData,
  ValidateNicknameData,
  LogoutData,
  GetMemberInfoData,
} from '@/types/user'

const instance = createAxiosInstance('members')
const api = createApi<ApiResponse>(instance)

export const userApi = {
  initMemberInfo: async (
    payload: InitMemberInfoPayload,
  ): Promise<InitMemberInfoData> => {
    const frm = new FormData()
    if (payload.multipartFile) {
      frm.append('multipartFile', payload.multipartFile)
    }
    frm.append(
      'memberInitRequestDto',
      new Blob([JSON.stringify(payload.memberInitRequestDto)], {
        type: 'application/json',
      }),
    )

    try {
      const response = await api.patch<InitMemberInfoData>('/init', frm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      console.error('회원 정보 초기화 오류:', error)
      throw error as CustomError
    }
  },

  validateNickname: async (nickname: string): Promise<ValidateNicknameData> => {
    try {
      const response = await api.get<ValidateNicknameData>(
        `/nickname-check?nickname=${nickname}`,
      )
      return response.data
    } catch (error) {
      throw error as CustomError
    }
  },

  logout: async (): Promise<LogoutData> => {
    try {
      const response = await api.get<LogoutData>('/logout')
      return response.data
    } catch (error) {
      throw error as CustomError
    }
  },

  getMemberInfo: async (): Promise<GetMemberInfoData> => {
    try {
      const response = await api.get<GetMemberInfoData>('')
      console.log(response.data)
      return response.data
    } catch (error) {
      throw error as CustomError
    }
  },
}
