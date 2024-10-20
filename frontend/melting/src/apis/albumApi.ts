import { createAxiosInstance, createApi, ApiResponse } from './axiosInstance'
import {
  AddAlbumLikesData,
  AiCoverImageRequestDto,
  AiDescriptionRequestDto,
  AlbumDetailsResponseDto,
  AlbumRankingPageResponseDto,
  AlbumRankingResponseDto,
  AlbumSearchPageResponseDto,
  AlbumUpdateRequestDto,
  CommentRequestDto,
  CreateAiAlbumCoverImageData,
  CreateAiAlbumCoverImageError,
  CreateAiDescriptionData,
  CreateAiDescriptionError,
  CreateAlbumData,
  CreateAlbumError,
  CreateAlbumPayload,
  DeleteAlbumData,
  DeleteAlbumLikesData,
  GenreResponseDto,
  GetAlbumDetailsData,
  GetAlbumDetailsError,
  GetAlbumLikesCountData,
  GetAlbumPageContainsHashtagData,
  GetAlbumsInCommunityMainPageData,
  GetAllCommentsData,
  GetAllGenresData,
  GetHot5AlbumsData,
  GetHot5AlbumsError,
  GetMonthlyAlbumsData,
  GetMonthlyAlbumsError,
  GetSteadyAlbumsData,
  GetSteadyAlbumsError,
  ToggleIsPublicData,
  UpdateAlbumDescriptionData,
  UpdateAlbumDescriptionError,
  GetAlbumPageContainsHashtagError,
  CommentResponseDto,
  GetAllCommentsError,
  GetAllGenresError,
  ModifyCommentData,
  DeleteCommentData,
  DeleteCommentError,
  WriteCommentError,
  ModifyCommentError,
  DeleteAlbumLikesError,
  CommentPageResponseDto,
  WriteCommentData,
} from '@/types/album.ts'
import {
  CommunityConditionType,
  communityVal,
  SortType,
} from '@/types/constType'

const instance = createAxiosInstance('albums')
const api = createApi<ApiResponse>(instance)

export const albumApi = {
  // 커뮤니티 메인 페이지의 앨범 목록 가져오기
  getAlbumsInCommunityMainPage: async (query?: { sort?: SortType }) => {
    try {
      const response = await api.get<GetAlbumsInCommunityMainPageData>('/', {
        params: query,
      })
      return response.data
    } catch (error) {
      console.error('앨범 목록을 가져오는 중 오류 발생:', error)
      throw error // 오류 처리는 상위 호출부에 맡김
    }
  },

  // 앨범 생성
  createAlbum: async (
    data: CreateAlbumPayload,
  ): Promise<AlbumDetailsResponseDto> => {
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

    // console.log(data.albumCreateRequestDto)
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value)
    // }

    try {
      const response = await api.post<CreateAlbumData>('', formData)
      return response.data as AlbumDetailsResponseDto
    } catch (error) {
      console.error('앨범 생성 중 오류 발생:', error)
      throw error as CreateAlbumError
    }
  },

  // 앨범 좋아요 수 가져오기
  getAlbumLikesCount: async (albumId: number) => {
    try {
      const response = await api.get<GetAlbumLikesCountData>(
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
      const response = await api.post<AddAlbumLikesData>(`/${albumId}/likes`)
      return response.data
    } catch (error) {
      console.error('앨범 좋아요 추가 중 오류 발생:', error)
      throw error
    }
  },

  // 앨범 좋아요 삭제
  deleteAlbumLikes: async (albumId: number) => {
    try {
      const response = await api.delete<DeleteAlbumLikesData>(
        `/${albumId}/likes`,
      )
      return response.data
    } catch (error) {
      console.error('앨범 좋아요 삭제 중 오류 발생:', error)
      throw error as DeleteAlbumLikesError
    }
  },

  // 앨범 댓글 가져오기
  getAllComments: async (
    albumId: number,
    query?: {
      page?: number
      size?: number
    },
  ): Promise<CommentPageResponseDto> => {
    try {
      const response = await api.get<GetAllCommentsData>(
        `/${albumId}/comments`,
        {
          params: query,
        },
      )
      return response.data as CommentPageResponseDto
    } catch (error) {
      console.error('댓글을 가져오는 중 오류 발생:', error)
      throw error as GetAllCommentsError
    }
  },

  // 앨범에 댓글 작성
  writeComment: async (albumId: number, data: CommentRequestDto) => {
    try {
      const response = await api.post<WriteCommentData>(
        `/${albumId}/comments`,
        data,
      )
      return response.data as CommentResponseDto
    } catch (error) {
      console.error('댓글 작성 중 오류 발생:', error)
      throw error as WriteCommentError
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
      return response.data as CommentResponseDto
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error)
      throw error as ModifyCommentError
    }
  },

  // 앨범 댓글 삭제
  deleteComment: async (albumId: number, commentId: number) => {
    try {
      const response = await instance.delete<DeleteCommentData>(
        `/${albumId}/comments/${commentId}`,
      )
      return response.data as CommentResponseDto
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error)
      throw error as DeleteCommentError
    }
  },

  getAlbumDetails: async (
    albumId: number,
  ): Promise<AlbumDetailsResponseDto> => {
    try {
      const response = await api.get<GetAlbumDetailsData>(`/${albumId}`)
      return response.data as AlbumDetailsResponseDto
    } catch (error) {
      console.error('앨범 상세 조회 중 오류 발생:', error)
      throw error as GetAlbumDetailsError
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

  createAiAlbumCoverImage: async (
    data: AiCoverImageRequestDto,
  ): Promise<string> => {
    try {
      const response = await api.post<CreateAiAlbumCoverImageData>(
        '/covers',
        data,
      )
      return response.data as string
    } catch (error) {
      console.error('AI 커버 이미지 생성 중 오류 발생:', error)
      throw error as CreateAiAlbumCoverImageError
    }
  },

  createAiDescription: async (data: AiDescriptionRequestDto) => {
    try {
      const response = await api.post<CreateAiDescriptionData>(
        '/descriptions',
        data,
      )
      return response.data as string
    } catch (error) {
      console.error('AI 커버 이미지 생성 중 오류 발생:', error)
      throw error as CreateAiDescriptionError
    }
  },

  // 앨범 공개/비공개 토글
  toggleIsPublic: async (albumId: number) => {
    try {
      const response = await api.patch<ToggleIsPublicData>(`/${albumId}/toggle`)
      return response.data
    } catch (error) {
      console.error('앨범 공개/비공개 토글 중 오류 발생:', error)
      throw error
    }
  },

  // 앨범 삭제
  deleteAlbum: async (albumId: number) => {
    try {
      const response = await api.delete<DeleteAlbumData>(`/${albumId}`)
      return response.data
    } catch (error) {
      console.error('앨범 삭제 중 오류 발생:', error)
      throw error
    }
  },

  updateAlbumDescription: async (
    albumId: number,
    data: AlbumUpdateRequestDto,
  ) => {
    try {
      const response = await api.patch<UpdateAlbumDescriptionData>(
        `/${albumId}`,
        data,
      )
      return response.data as AlbumDetailsResponseDto
    } catch (error) {
      console.log('앨범 수정 중 오류 발생:', error)
      throw error as UpdateAlbumDescriptionError
    }
  },

  getAlbumPageContainsHashtag: async (
    hashtag: string, // 해시태그 경로 변수
    query?: { page?: number; size?: number }, // 쿼리 파라미터 (옵션)
  ) => {
    try {
      // GET 요청 보내기
      const response = await api.get<GetAlbumPageContainsHashtagData>(
        `/hashtags/${hashtag}`, // 요청 경로
        { params: query }, // 쿼리 파라미터 설정
      )
      return response.data as AlbumRankingPageResponseDto // 성공 시 응답 데이터 반환
    } catch (error) {
      console.error('해시태그가 포함된 앨범 검색 실패:', error)
      throw error as GetAlbumPageContainsHashtagError // 오류 발생 시 예외 처리
    }
  },
  getCommunityAlbums: async (query: {
    keyword: string
    options: CommunityConditionType[]
    page: number
  }) => {
    try {
      const optionParam = query.options.map((v) => {
        return communityVal[v]
      })
      const response = await api.get<AlbumSearchPageResponseDto>(`/search`, {
        params: {
          keyword: query.keyword,
          options: optionParam.join(','),
          page: query.page,
        },
      })
      return response.data as AlbumSearchPageResponseDto
    } catch (error) {
      console.error('앨범 조회 중 오류 발생:', error)
      throw error
    }
  },
}
