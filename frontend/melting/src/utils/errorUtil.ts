import axios, { AxiosError } from 'axios'

export function handleApiError<T>(error: unknown): T {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<T>
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data
    }
  }
  throw error
}
