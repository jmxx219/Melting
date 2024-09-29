import { createAxiosInstance } from './axiosInstance'
import {
  AddAlbumLikesData,
  CommentRequestDto,
  CreateAlbumData,
  DeleteAlbumLikesData,
  GetAlbumLikesCountData,
  GetAlbumsInCommunityMainPageData,
  GetAllCommentsData,
  WriteCommentData,
} from '@/types/album.ts'
import { AlbumCreateRequestDto } from '@/typeApis/data-contracts.ts'

const axiosInstance = createAxiosInstance('albums')

export const albumApi = {
  // 커뮤니티 메인 페이지의 앨범 목록 가져오기
  getAlbumsInCommunityMainPage: async (query?: {
    sort?: 'LATEST' | 'POPULAR'
  }) => {
    try {
      const response =
        await axiosInstance.get<GetAlbumsInCommunityMainPageData>('/', {
          params: query,
        })
      return response.data
    } catch (error) {
      console.error('앨범 목록을 가져오는 중 오류 발생:', error)
      throw error // 오류 처리는 상위 호출부에 맡김
    }
  },

  // 앨범 생성
  createAlbum: async (data: AlbumCreateRequestDto) => {
    try {
      const response = await axiosInstance.post<CreateAlbumData>('/', data)
      return response.data
    } catch (error) {
      console.error('앨범 생성 중 오류 발생:', error)
      throw error
    }
  },

  // 앨범 좋아요 수 가져오기
  getAlbumLikesCount: async (albumId: number) => {
    try {
      const response = await axiosInstance.get<GetAlbumLikesCountData>(
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
      const response = await axiosInstance.post<AddAlbumLikesData>(
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
      const response = await axiosInstance.delete<DeleteAlbumLikesData>(
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
      const response = await axiosInstance.get<GetAllCommentsData>(
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
      const response = await axiosInstance.post<WriteCommentData>(
        `/${albumId}/comments`,
        data,
      )
      return response.data
    } catch (error) {
      console.error('댓글 작성 중 오류 발생:', error)
      throw error
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
