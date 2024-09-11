import { LoginResponse } from '@/types/auth'

// 소셜 로그인으로 구현
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  // 실제 API 호출을 여기에 구현합니다.
  // 지금은 더미 응답을 반환합니다.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accessToken: 'dummy_token',
        user: {
          id: '1',
          email: email,
        },
      })
    }, 1000)
  })
}
