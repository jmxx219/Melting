import {
  createAxiosInstance,
  createApi,
  ApiResponse,
  CustomError,
} from './axiosInstance'
import {
  InitMemberInfoPayload,
  InitMemberInfoData,
  ValidateNicknameData,
  LogoutData,
  GetMemberInfoData,
  UpdateMemberInfoPayload,
  UpdateMemberInfoData,
  MemberResponseDto,
  GetMemberAlbumsData,
  GetMemberLikesAlbumsData,
  GetMemberAlbumsError,
  GetMemberLikesAlbumsError,
  AlbumMyPageResponseDto,
  SongMypagePageResponseDto,
  GetMemberSongsData,
  GetMemberSongsError,
  GetMeltingCountsData,
  GetMeltingCountsError,
  MemberSongCountsResponseDto,
  GetMemberLikesSongsData,
  SongLikesPageResponseDto,
  GetMemberHashtagsData,
  GetMemberHashtagsError,
  AddMemberHashtagData,
  AddMemberHashtagError,
  DeleteMemberHashtagData,
  DeleteMemberHashtagError,
} from '@/types/user'
const instance = createAxiosInstance('members')
const api = createApi<ApiResponse>(instance)

export const userApi = {
  initMemberInfo: async (
    payload: InitMemberInfoPayload,
  ): Promise<InitMemberInfoData> => {
    const frm = new FormData()
    if (payload.multipartFile) {
      frm.append('multipartFile', payload.multipartFile)
    } else {
      // 빈 Blob 추가
      frm.append('multipartFile', new Blob(), '')
    }
    frm.append(
      'memberInitRequestDto',
      new Blob([JSON.stringify(payload.memberInitRequestDto)], {
        type: 'application/json',
      }),
    )

    try {
      const response = await api.patch<InitMemberInfoData>('/init', frm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      console.error('회원 정보 초기화 오류:', error)
      throw error as CustomError
    }
  },

  validateNickname: async (nickname: string): Promise<ValidateNicknameData> => {
    try {
      const response = await api.get<ValidateNicknameData>(
        `/nickname-check?nickname=${nickname}`,
      )
      return response.data
    } catch (error) {
      throw error as CustomError
    }
  },

  logout: async (): Promise<LogoutData> => {
    try {
      const response = await api.get<LogoutData>('/logout')
      return response.data
    } catch (error) {
      throw error as CustomError
    }
  },

  getMemberInfo: async (): Promise<GetMemberInfoData> => {
    try {
      const response = await api.get<GetMemberInfoData>('')
      return response.data
    } catch (error) {
      throw error as CustomError
    }
  },

  updateMemberInfo: async (
    payload: UpdateMemberInfoPayload,
  ): Promise<MemberResponseDto> => {
    const frm = new FormData()

    if (payload.multipartFile) {
      frm.append('multipartFile', payload.multipartFile)
    } else {
      frm.append('multipartFile', new Blob(), '')
    }

    frm.append(
      'memberUpdateRequestDto',
      new Blob([JSON.stringify(payload.memberUpdateRequestDto)], {
        type: 'application/json',
      }),
    )

    try {
      const response = await api.patch<UpdateMemberInfoData>('', frm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data as MemberResponseDto
    } catch (error) {
      console.error('회원 정보 수정 오류:', error)
      throw error as CustomError
    }
  },
  getMemberAlbums: async (
    sort?: string | null,
    page?: number,
    size?: number,
  ): Promise<AlbumMyPageResponseDto> => {
    try {
      const response = await api.get<GetMemberAlbumsData>('/me/albums', {
        params: {
          sort,
          page,
          size,
        },
      })
      return response.data as AlbumMyPageResponseDto
    } catch (error) {
      console.error('회원 앨범 조회 오류:', error)
      throw error as GetMemberAlbumsError
    }
  },
  getMemberLikesAlbums: async (
    sort?: string | null,
    page?: number,
    size?: number,
  ): Promise<AlbumMyPageResponseDto> => {
    try {
      const response = await api.get<GetMemberLikesAlbumsData>(
        '/me/likes/albums',
        {
          params: {
            sort,
            page,
            size,
          },
        },
      )
      return response.data as AlbumMyPageResponseDto
    } catch (error) {
      console.error('회원 좋아요한 앨범 조회 오류:', error)
      throw error as GetMemberLikesAlbumsError
    }
  },
  getMemberSongs: async (
    page?: number,
    size?: number,
  ): Promise<SongMypagePageResponseDto> => {
    try {
      const response = await api.get<GetMemberSongsData>('/me/songs', {
        params: {
          page,
          size,
        },
      })
      return response.data as SongMypagePageResponseDto
    } catch (error) {
      throw error as GetMemberSongsError
    }
  },
  getMemberLikesSongs: async (
    sort?: string | null,
    page?: number,
    size?: number,
  ): Promise<SongLikesPageResponseDto> => {
    try {
      const response = await api.get<GetMemberLikesSongsData>(
        '/me/likes/songs',
        {
          params: {
            sort,
            page,
            size,
          },
        },
      )
      return response.data as SongLikesPageResponseDto
    } catch (error) {
      console.error('회원 앨범 조회 오류:', error)
      throw error as GetMemberAlbumsError
    }
  },
  getUserCoverCnt: async (): Promise<MemberSongCountsResponseDto> => {
    try {
      const response = await api.get<GetMeltingCountsData>('/me/songcounts')
      return response.data as MemberSongCountsResponseDto
    } catch (error) {
      console.error('Failed to fetch songs for album creation:', error)
      throw error as GetMeltingCountsError
    }
  },

  getMemberHashtags: async () => {
    try {
      const response = await api.get<GetMemberHashtagsData>('/me/hashtags')
      return response.data as string[]
    } catch (error) {
      console.error('사용자 태그 목록 불러오기 실패: ', error)
      throw error as GetMemberHashtagsError
    }
  },

  addMemberHashtag: async (query: { content: string }) => {
    try {
      const response = await api.post<AddMemberHashtagData>(
        `/me/hashtags?content=${encodeURIComponent(query.content)}`, // 쿼리 스트링으로 content 전달
      )
      return response.data as string[]
    } catch (error) {
      console.error('사용자 태그 추가 실패: ', error)
      throw error as AddMemberHashtagError
    }
  },

  deleteMemberHashtag: async (query: { content: string }) => {
    try {
      const response = await api.delete<DeleteMemberHashtagData>(
        'me/hashtags',
        {
          params: query, // query를 params로 전달
        },
      )
      return response.data as string[]
    } catch (error) {
      console.error('사용자 태그 추가 실패: ', error)
      throw error as DeleteMemberHashtagError
    }
  },
}
