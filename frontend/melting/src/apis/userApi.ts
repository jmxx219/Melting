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
  MemberSongResponseDto,
  GetMemberSongsData,
  GetMemberSongsError,
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
  getMemberAlbums: async (): Promise<AlbumMyPageResponseDto> => {
    try {
      const response = await api.get<GetMemberAlbumsData>('/me/albums')
      // const response = dummyData
      return response.data as AlbumMyPageResponseDto
    } catch (error) {
      console.error('회원 앨범 조회 오류:', error)
      throw error as GetMemberAlbumsError
    }
  },
  getMemberLikesAlbums: async (): Promise<AlbumMyPageResponseDto> => {
    try {
      const response =
        await api.get<GetMemberLikesAlbumsData>('/me/likes/albums')
      // const response = dummyData
      return response.data as AlbumMyPageResponseDto
    } catch (error) {
      console.error('회원 좋아요한 앨범 조회 오류:', error)
      throw error as GetMemberLikesAlbumsError
    }
  },
  getMemberSongs: async (): Promise<MemberSongResponseDto> => {
    try {
      const response = await api.get<GetMemberSongsData>('')
      return response.data as MemberSongResponseDto
    } catch (error) {
      throw error as GetMemberSongsError
    }
  },
}
