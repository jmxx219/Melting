import axios from 'axios'
import {
  InitMemberInfoPayload,
  InitMemberInfoData,
  InitMemberInfoError,
  ValidateNicknameData,
  ValidateNicknameError,
  LogoutData,
  LogoutError,
} from '@/types/user'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const VITE_API_MEMBERS_PATH = import.meta.env.VITE_API_MEMBERS_PATH
const BASE_URL = `${VITE_API_BASE_URL}${VITE_API_MEMBERS_PATH}`

export const initMemberInfo = async (
  payload: InitMemberInfoPayload,
): Promise<InitMemberInfoData | InitMemberInfoError> => {
  try {
    const frm = new FormData()

    // multipartFile이 있을 경우에만 추가
    if (payload.multipartFile) {
      frm.append('multipartFile', payload.multipartFile)
    }

    // memberInitRequestDto를 FormData에 추가
    frm.append(
      'memberInitRequestDto',
      new Blob([JSON.stringify(payload.memberInitRequestDto)], {
        type: 'application/json',
      }),
    )

    const response = await axios.patch(`${BASE_URL}/init`, frm, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    console.error('회원 정보 초기화 오류:', error)
    throw error
  }
}

export const validateNickname = async (nickname: string) => {
  try {
    const response = await axios.get<ValidateNicknameData>(
      `${BASE_URL}/nickname-check`,
      {
        params: { nickname },
        withCredentials: true,
      },
    )
    return response.data
  } catch (error: any) {
    throw error.response?.data as ValidateNicknameError
  }
}

export const logout = async () => {
  try {
    const response = await axios.get<LogoutData>(`${BASE_URL}/logout`, {
      withCredentials: true,
    })
    return response.data
  } catch (error: any) {
    throw error.response?.data as LogoutError
  }
}
