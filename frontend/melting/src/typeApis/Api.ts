/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  AddAlbumLikesData,
  AddAlbumLikesError,
  AddSongLikesData,
  AddSongLikesError,
  AddVoiceData,
  AddVoiceError,
  AlbumCreateRequestDto,
  AlbumUpdateRequestDto,
  CommentRequestDto,
  CreateAlbumData,
  CreateAlbumError,
  DeleteAlbumLikesData,
  DeleteAlbumLikesError,
  DeleteCommentData,
  DeleteCommentError,
  DeleteSongLikesData,
  DeleteSongLikesError,
  GetAlbumDetailsData,
  GetAlbumDetailsError,
  GetAlbumLikesCountData,
  GetAlbumLikesCountError,
  GetAlbumsInCommunityMainPageData,
  GetAlbumsInCommunityMainPageError,
  GetAllCommentsData,
  GetAllCommentsError,
  GetMemberInfoData,
  GetMemberInfoError,
  GetMemberSongsData,
  GetMemberSongsError,
  GetOriginalSongInfoData,
  GetOriginalSongInfoError,
  GetSearchListData,
  GetSearchListError,
  GetSongDetailsData,
  GetSongDetailsError,
  GetSongLikesCountData,
  GetSongLikesCountError,
  InitMemberInfoData,
  InitMemberInfoError,
  InitMemberInfoPayload,
  LogoutData,
  LogoutError,
  ModifyCommentData,
  ModifyCommentError,
  ReissueData,
  ReissueError,
  SearchAlbumsByKeywordData,
  SearchAlbumsByKeywordError,
  Type보이스등록요청,
  UpdateAlbumData,
  UpdateAlbumError,
  UpdateMemberInfoData,
  UpdateMemberInfoError,
  UpdateMemberInfoPayload,
  ValidateNicknameData,
  ValidateNicknameError,
  WriteCommentData,
  WriteCommentError,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags likes-controller
   * @name GetSongLikesCount
   * @request GET:/api/v1/songs/{songId}/likes
   * @response `200` `GetSongLikesCountData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getSongLikesCount = (songId: number, params: RequestParams = {}) =>
    this.request<GetSongLikesCountData, GetSongLikesCountError>({
      path: `/api/v1/songs/${songId}/likes`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags likes-controller
   * @name AddSongLikes
   * @request POST:/api/v1/songs/{songId}/likes
   * @response `200` `AddSongLikesData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  addSongLikes = (songId: number, params: RequestParams = {}) =>
    this.request<AddSongLikesData, AddSongLikesError>({
      path: `/api/v1/songs/${songId}/likes`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @tags likes-controller
   * @name DeleteSongLikes
   * @request DELETE:/api/v1/songs/{songId}/likes
   * @response `200` `DeleteSongLikesData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  deleteSongLikes = (songId: number, params: RequestParams = {}) =>
    this.request<DeleteSongLikesData, DeleteSongLikesError>({
      path: `/api/v1/songs/${songId}/likes`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @tags auth-controller
   * @name Reissue
   * @request POST:/api/v1/members/reissue
   * @response `200` `ReissueData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  reissue = (params: RequestParams = {}) =>
    this.request<ReissueData, ReissueError>({
      path: `/api/v1/members/reissue`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @tags voice-controller
   * @name AddVoice
   * @summary 사용자 보이스 등록 API
   * @request POST:/api/v1/members/me/voices
   * @response `200` `AddVoiceData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  addVoice = (data: Type보이스등록요청, params: RequestParams = {}) =>
    this.request<AddVoiceData, AddVoiceError>({
      path: `/api/v1/members/me/voices`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    })
  /**
   * No description
   *
   * @tags album-controller
   * @name GetAlbumsInCommunityMainPage
   * @request GET:/api/v1/albums
   * @response `200` `GetAlbumsInCommunityMainPageData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getAlbumsInCommunityMainPage = (
    query?: {
      /** @default "latest" */
      sort?: 'LATEST' | 'POPULAR'
    },
    params: RequestParams = {},
  ) =>
    this.request<
      GetAlbumsInCommunityMainPageData,
      GetAlbumsInCommunityMainPageError
    >({
      path: `/api/v1/albums`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags album-controller
   * @name CreateAlbum
   * @request POST:/api/v1/albums
   * @response `200` `CreateAlbumData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  createAlbum = (data: AlbumCreateRequestDto, params: RequestParams = {}) =>
    this.request<CreateAlbumData, CreateAlbumError>({
      path: `/api/v1/albums`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags likes-controller
   * @name GetAlbumLikesCount
   * @request GET:/api/v1/albums/{albumId}/likes
   * @response `200` `GetAlbumLikesCountData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getAlbumLikesCount = (albumId: number, params: RequestParams = {}) =>
    this.request<GetAlbumLikesCountData, GetAlbumLikesCountError>({
      path: `/api/v1/albums/${albumId}/likes`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags likes-controller
   * @name AddAlbumLikes
   * @request POST:/api/v1/albums/{albumId}/likes
   * @response `200` `AddAlbumLikesData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  addAlbumLikes = (albumId: number, params: RequestParams = {}) =>
    this.request<AddAlbumLikesData, AddAlbumLikesError>({
      path: `/api/v1/albums/${albumId}/likes`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @tags likes-controller
   * @name DeleteAlbumLikes
   * @request DELETE:/api/v1/albums/{albumId}/likes
   * @response `200` `DeleteAlbumLikesData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  deleteAlbumLikes = (albumId: number, params: RequestParams = {}) =>
    this.request<DeleteAlbumLikesData, DeleteAlbumLikesError>({
      path: `/api/v1/albums/${albumId}/likes`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @tags comment-controller
   * @name GetAllComments
   * @request GET:/api/v1/albums/{albumId}/comments
   * @response `200` `GetAllCommentsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getAllComments = (
    albumId: number,
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number
      /**
       * @format int32
       * @default 25
       */
      size?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<GetAllCommentsData, GetAllCommentsError>({
      path: `/api/v1/albums/${albumId}/comments`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags comment-controller
   * @name WriteComment
   * @request POST:/api/v1/albums/{albumId}/comments
   * @response `200` `WriteCommentData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  writeComment = (
    albumId: number,
    data: CommentRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<WriteCommentData, WriteCommentError>({
      path: `/api/v1/albums/${albumId}/comments`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags member-controller
   * @name GetMemberInfo
   * @request GET:/api/v1/members
   * @response `200` `GetMemberInfoData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getMemberInfo = (params: RequestParams = {}) =>
    this.request<GetMemberInfoData, GetMemberInfoError>({
      path: `/api/v1/members`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags member-controller
   * @name UpdateMemberInfo
   * @request PATCH:/api/v1/members
   * @response `200` `UpdateMemberInfoData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  updateMemberInfo = (
    data: UpdateMemberInfoPayload,
    params: RequestParams = {},
  ) =>
    this.request<UpdateMemberInfoData, UpdateMemberInfoError>({
      path: `/api/v1/members`,
      method: 'PATCH',
      body: data,
      type: ContentType.FormData,
      ...params,
    })
  /**
   * No description
   *
   * @tags member-controller
   * @name InitMemberInfo
   * @request PATCH:/api/v1/members/init
   * @response `200` `InitMemberInfoData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  initMemberInfo = (data: InitMemberInfoPayload, params: RequestParams = {}) =>
    this.request<InitMemberInfoData, InitMemberInfoError>({
      path: `/api/v1/members/init`,
      method: 'PATCH',
      body: data,
      type: ContentType.FormData,
      ...params,
    })
  /**
   * No description
   *
   * @tags album-controller
   * @name GetAlbumDetails
   * @request GET:/api/v1/albums/{albumId}
   * @response `200` `GetAlbumDetailsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getAlbumDetails = (albumId: number, params: RequestParams = {}) =>
    this.request<GetAlbumDetailsData, GetAlbumDetailsError>({
      path: `/api/v1/albums/${albumId}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags album-controller
   * @name UpdateAlbum
   * @request PATCH:/api/v1/albums/{albumId}
   * @response `200` `UpdateAlbumData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  updateAlbum = (
    albumId: number,
    data: AlbumUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<UpdateAlbumData, UpdateAlbumError>({
      path: `/api/v1/albums/${albumId}`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags comment-controller
   * @name DeleteComment
   * @request DELETE:/api/v1/albums/{albumId}/comments/{commentId}
   * @response `200` `DeleteCommentData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  deleteComment = (
    albumId: number,
    commentId: number,
    params: RequestParams = {},
  ) =>
    this.request<DeleteCommentData, DeleteCommentError>({
      path: `/api/v1/albums/${albumId}/comments/${commentId}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @tags comment-controller
   * @name ModifyComment
   * @request PATCH:/api/v1/albums/{albumId}/comments/{commentId}
   * @response `200` `ModifyCommentData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  modifyComment = (
    albumId: number,
    commentId: number,
    data: CommentRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<ModifyCommentData, ModifyCommentError>({
      path: `/api/v1/albums/${albumId}/comments/${commentId}`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags song-controller
   * @name GetSongDetails
   * @summary 곡 상세조회(스트리밍) API
   * @request GET:/api/v1/songs/{songId}
   * @response `200` `GetSongDetailsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getSongDetails = (songId: number, params: RequestParams = {}) =>
    this.request<GetSongDetailsData, GetSongDetailsError>({
      path: `/api/v1/songs/${songId}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags original-song-controller
   * @name GetSearchList
   * @request GET:/api/v1/original-songs
   * @response `200` `GetSearchListData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getSearchList = (
    query: {
      keyword: string
    },
    params: RequestParams = {},
  ) =>
    this.request<GetSearchListData, GetSearchListError>({
      path: `/api/v1/original-songs`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags original-song-controller
   * @name GetOriginalSongInfo
   * @request GET:/api/v1/original-songs/{originalSongId}
   * @response `200` `GetOriginalSongInfoData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getOriginalSongInfo = (originalSongId: number, params: RequestParams = {}) =>
    this.request<GetOriginalSongInfoData, GetOriginalSongInfoError>({
      path: `/api/v1/original-songs/${originalSongId}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags member-controller
   * @name ValidateNickname
   * @request GET:/api/v1/members/nickname-check
   * @response `200` `ValidateNicknameData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  validateNickname = (
    query: {
      nickname: string
    },
    params: RequestParams = {},
  ) =>
    this.request<ValidateNicknameData, ValidateNicknameError>({
      path: `/api/v1/members/nickname-check`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags member-controller
   * @name GetMemberSongs
   * @summary 사용자가 생성한 곡 목록
   * @request GET:/api/v1/members/me/songs
   * @response `200` `GetMemberSongsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getMemberSongs = (params: RequestParams = {}) =>
    this.request<GetMemberSongsData, GetMemberSongsError>({
      path: `/api/v1/members/me/songs`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags member-controller
   * @name Logout
   * @request GET:/api/v1/members/logout
   * @response `200` `LogoutData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  logout = (params: RequestParams = {}) =>
    this.request<LogoutData, LogoutError>({
      path: `/api/v1/members/logout`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags album-controller
   * @name SearchAlbumsByKeyword
   * @request GET:/api/v1/albums/search
   * @response `200` `SearchAlbumsByKeywordData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  searchAlbumsByKeyword = (
    query: {
      keyword: string
      type: string[]
    },
    params: RequestParams = {},
  ) =>
    this.request<SearchAlbumsByKeywordData, SearchAlbumsByKeywordError>({
      path: `/api/v1/albums/search`,
      method: 'GET',
      query: query,
      ...params,
    })
}
