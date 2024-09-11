interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
  }
}

// 소셜 로그인으로 구현
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  // 실제 API 호출을 여기에 구현합니다.
  // 지금은 더미 응답을 반환합니다.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'dummy_token',
        user: {
          id: '1',
          email: email,
        },
      })
    }, 1000)
  })
}
