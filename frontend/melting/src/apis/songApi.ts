import {
  ApiResponse,
  createApi,
  createAxiosInstance,
} from '@/apis/axiosInstance.ts'
import {
  GetSongsForAlbumCreationData,
  GetSongsForAlbumCreationError,
  SongSearchPageResponseDto,
} from '@/types/song.ts'

const instance = createAxiosInstance('songs')
const api = createApi<ApiResponse>(instance)

export const songApi = {
  getSongsForAlbumCreation: async (
    keyword: string | null,
    page?: number,
    size?: number,
  ): Promise<SongSearchPageResponseDto> => {
    try {
      const response = await api.get<GetSongsForAlbumCreationData>('', {
        params: {
          keyword,
          page,
          size,
        },
      })
      return response.data as SongSearchPageResponseDto
    } catch (error) {
      console.error('Failed to fetch songs for album creation:', error)
      throw error as GetSongsForAlbumCreationError
    }
  },
}
