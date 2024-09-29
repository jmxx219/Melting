import { createAxiosInstance } from './axiosInstance'
import {
  InitMemberInfoPayload,
  InitMemberInfoData,
  InitMemberInfoError,
  ValidateNicknameData,
  ValidateNicknameError,
  LogoutData,
  LogoutError,
} from '@/types/user'
import { handleApiError } from '@/utils/errorUtil.ts'
import { GetMemberInfoData, GetMemberInfoError } from '@/types/user.ts'

const axiosInstance = createAxiosInstance('members')

export const userApi = {
  initMemberInfo: async (
    payload: InitMemberInfoPayload,
  ): Promise<InitMemberInfoData | InitMemberInfoError> => {
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
      const response = await axiosInstance.patch<InitMemberInfoData>(
        '/init',
        frm,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      return response.data
    } catch (error) {
      console.error('회원 정보 초기화 오류:', error)
      throw error
    }
  },

  validateNickname: async (nickname: string): Promise<ValidateNicknameData> => {
    try {
      const response = await axiosInstance.get<ValidateNicknameData>(
        '/nickname-check',
        {
          params: { nickname },
        },
      )
      return response.data
    } catch (error) {
      throw handleApiError<ValidateNicknameError>(error)
    }
  },

  logout: async (): Promise<LogoutData> => {
    try {
      const response = await axiosInstance.get<LogoutData>('/logout')
      return response.data
    } catch (error) {
      throw handleApiError<LogoutError>(error)
    }
  },

  getMemberInfo: async (): Promise<GetMemberInfoData | GetMemberInfoError> => {
    try {
      const response = await axiosInstance.get<GetMemberInfoData>('')
      return response.data
    } catch (error) {
      throw handleApiError<GetMemberInfoError>(error)
    }
  },
}
