export interface LoginResponse {
  accessToken: string
  user: {
    id: string
    email: string
  }
}
