import {
  createAxiosInstance,
  createApi,
  ApiResponse,
  CustomError,
} from './axiosInstance'
import {
  AlbumCreateRequestDto,
  AddAlbumLikesData,
  CommentRequestDto,
  CreateAlbumData,
  DeleteAlbumLikesData,
  GenreResponseDto,
  GetAlbumLikesCountData,
  GetAlbumsInCommunityMainPageData,
  GetAllCommentsData,
  GetAllGenresData,
  WriteCommentData,
  CreateAlbumPayload,
  CreateAlbumError,
  GetHot5AlbumsData,
  GetHot5AlbumsError,
  GetMonthlyAlbumsData,
  GetMonthlyAlbumsError,
  GetSteadyAlbumsData,
  GetSteadyAlbumsError,
  AlbumRankingResponseDto,
} from '@/types/album.ts'

const instance = createAxiosInstance('albums')
const api = createApi<ApiResponse>(instance)

export const albumApi = {
  // 커뮤니티 메인 페이지의 앨범 목록 가져오기
  getAlbumsInCommunityMainPage: async (query?: {
    sort?: 'LATEST' | 'POPULAR'
  }) => {
    try {
      const response = await instance.get<GetAlbumsInCommunityMainPageData>(
        '/',
        {
          params: query,
        },
      )
      return response.data
    } catch (error) {
      console.error('앨범 목록을 가져오는 중 오류 발생:', error)
      throw error // 오류 처리는 상위 호출부에 맡김
    }
  },

  // 앨범 생성
  createAlbum: async (data: CreateAlbumPayload) => {
    const formData = new FormData()

    // FormData에 데이터를 추가합니다.
    formData.append('albumCoverImage', data.albumCoverImage)

    // albumCreateRequestDto의 모든 필드를 FormData에 추가합니다.
    formData.append(
      'albumCreateRequestDto',
      new Blob([JSON.stringify(data.albumCreateRequestDto)], {
        type: 'application/json',
      }),
    )

    try {
      const response = await api.post<CreateAlbumData>('', formData)
      return response.data
    } catch (error) {
      console.error('앨범 생성 중 오류 발생:', error)
      throw error as CreateAlbumError
    }
  },

  // 앨범 좋아요 수 가져오기
  getAlbumLikesCount: async (albumId: number) => {
    try {
      const response = await instance.get<GetAlbumLikesCountData>(
        `/${albumId}/likes`,
      )
      return response.data
    } catch (error) {
      console.error('앨범 좋아요 수를 가져오는 중 오류 발생:', error)
      throw error
    }
  },

  // 앨범 좋아요 추가
  addAlbumLikes: async (albumId: number) => {
    try {
      const response = await instance.post<AddAlbumLikesData>(
        `/${albumId}/likes`,
      )
      return response.data
    } catch (error) {
      console.error('앨범 좋아요 추가 중 오류 발생:', error)
      throw error
    }
  },

  // 앨범 좋아요 삭제
  deleteAlbumLikes: async (albumId: number) => {
    try {
      const response = await instance.delete<DeleteAlbumLikesData>(
        `/${albumId}/likes`,
      )
      return response.data
    } catch (error) {
      console.error('앨범 좋아요 삭제 중 오류 발생:', error)
      throw error
    }
  },

  // 앨범 댓글 가져오기
  getAllComments: async (
    albumId: number,
    query?: {
      page?: number
      size?: number
    },
  ) => {
    try {
      const response = await instance.get<GetAllCommentsData>(
        `/${albumId}/comments`,
        {
          params: query,
        },
      )
      return response.data
    } catch (error) {
      console.error('댓글을 가져오는 중 오류 발생:', error)
      throw error
    }
  },

  // 앨범에 댓글 작성
  writeComment: async (albumId: number, data: CommentRequestDto) => {
    try {
      const response = await instance.post<WriteCommentData>(
        `/${albumId}/comments`,
        data,
      )
      return response.data
    } catch (error) {
      console.error('댓글 작성 중 오류 발생:', error)
      throw error
    }
  },

  getAllGenres: async (): Promise<GenreResponseDto[]> => {
    try {
      const response = await api.get<GetAllGenresData>('/genres')
      if (response.data && Array.isArray(response.data)) {
        return response.data
      } else {
        return [] // 데이터가 없거나 형식이 맞지 않으면 빈 배열 반환
      }
    } catch (error) {
      console.error('장르 목록 가져오기 오류:', error)
      throw error as CustomError
    }
  },

  // 가장 인기 있는 5개의 앨범 가져오기
  getHot5Albums: async (): Promise<AlbumRankingResponseDto[]> => {
    try {
      const response = await api.get<GetHot5AlbumsData>('/daily')
      return response.data as AlbumRankingResponseDto[]
    } catch (error) {
      console.error('가장 인기 있는 5개의 앨범 가져오기 중 오류 발생:', error)
      throw error as GetHot5AlbumsError
    }
  },

  // 월간 앨범 목록 가져오기
  getMonthlyAlbums: async (): Promise<AlbumRankingResponseDto[]> => {
    try {
      const response = await api.get<GetMonthlyAlbumsData>('/monthly')
      return response.data as AlbumRankingResponseDto[]
    } catch (error) {
      console.error('월간 앨범 목록 가져오기 중 오류 발생:', error)
      throw error as GetMonthlyAlbumsError
    }
  },

  // 지속적으로 인기 있는 앨범 목록 가져오기
  getSteadyAlbums: async (): Promise<AlbumRankingResponseDto[]> => {
    try {
      const response = await api.get<GetSteadyAlbumsData>('/steady')
      return response.data as AlbumRankingResponseDto[]
    } catch (error) {
      console.error(
        '지속적으로 인기 있는 앨범 목록 가져오기 중 오류 발생:',
        error,
      )
      throw error as GetSteadyAlbumsError
    }
  },
}

export async function searchHashtags(query: string): Promise<string[]> {
  // 실제 API 호출 로직을 여기에 구현합니다.
  // 예시 코드:
  // const response = await fetch(`/api/hashtags?query=${encodeURIComponent(query)}`);
  // const data = await response.json();
  // return data.hashtags;
  return ['사진', '사랑해', '사랑합니다', '사진스타그램'].filter((tag) =>
    tag.includes(query),
  )
}
