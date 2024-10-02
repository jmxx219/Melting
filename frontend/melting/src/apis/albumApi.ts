import { createAxiosInstance, createApi, ApiResponse } from './axiosInstance'
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
  CommentResponseDto,
  GetAllCommentsError,
  GetAllGenresError,
  ModifyCommentData,
  DeleteCommentData,
} from '@/types/album.ts'
import { RequestParams } from '@/types/globalType.ts'

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
  createAlbum: async (data: AlbumCreateRequestDto) => {
    try {
      const response = await instance.post<CreateAlbumData>('/', data)
      return response.data
    } catch (error) {
      console.error('앨범 생성 중 오류 발생:', error)
      throw error
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
    params?: RequestParams,
  ): Promise<CommentResponseDto[]> => {
    try {
      const response = await instance.get<GetAllCommentsData>(
        `/${albumId}/comments`,
        {
          params: query,
          ...params,
        },
      )
      if (response.data && Array.isArray(response.data)) {
        return response.data
      } else {
        return [] // 데이터가 없거나 형식이 맞지 않으면 빈 배열 반환
      }
    } catch (error) {
      console.error('댓글을 가져오는 중 오류 발생:', error)
      throw error as GetAllCommentsError
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

  // 앨범 댓글 수정
  modifyComment: async (
    albumId: number,
    commentId: number,
    data: CommentRequestDto,
  ) => {
    try {
      const response = await instance.patch<ModifyCommentData>(
        `/${albumId}/comments/${commentId}`,
        data,
      )
      return response.data
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error)
      throw error
    }
  },

  // 앨범 댓글 삭제
  deleteComment: async (albumId: number, commentId: number) => {
    try {
      const response = await instance.delete<DeleteCommentData>(
        `/${albumId}/comments/${commentId}`,
      )
      return response.data
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error)
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
      throw error as GetAllGenresError
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
