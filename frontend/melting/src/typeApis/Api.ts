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
  AddMemberHashtagData,
  AddMemberHashtagError,
  AddSongLikesData,
  AddSongLikesError,
  AiCoverImageRequestDto,
  AiDescriptionRequestDto,
  AI커버곡등록요청,
  AlbumUpdateRequestDto,
  CommentRequestDto,
  CreateAiAlbumCoverImageData,
  CreateAiAlbumCoverImageError,
  CreateAicoverSongData,
  CreateAicoverSongError,
  CreateAiDescriptionData,
  CreateAiDescriptionError,
  CreateAlbumData,
  CreateAlbumError,
  CreateAlbumPayload,
  CreateMeltingSongData,
  CreateMeltingSongError,
  DeleteAlbumData,
  DeleteAlbumError,
  DeleteAlbumLikesData,
  DeleteAlbumLikesError,
  DeleteCommentData,
  DeleteCommentError,
  DeleteMemberHashtagData,
  DeleteMemberHashtagError,
  DeleteSongLikesData,
  DeleteSongLikesError,
  GetAlbumDetailsData,
  GetAlbumDetailsError,
  GetAlbumLikesCountData,
  GetAlbumLikesCountError,
  GetAlbumsData,
  GetAlbumsError,
  GetAllCommentsData,
  GetAllCommentsError,
  GetAllGenresData,
  GetAllGenresError,
  GetHot5AlbumsData,
  GetHot5AlbumsError,
  GetMeltingCountsData,
  GetMeltingCountsError,
  GetMemberAlbumsData,
  GetMemberAlbumsError,
  GetMemberHashtagsData,
  GetMemberHashtagsError,
  GetMemberInfoData,
  GetMemberInfoError,
  GetMemberLikesAlbumsData,
  GetMemberLikesAlbumsError,
  GetMemberLikesSongsData,
  GetMemberLikesSongsError,
  GetMemberSongsData,
  GetMemberSongsError,
  GetMonthlyAlbumsData,
  GetMonthlyAlbumsError,
  GetOriginalSongInfoData,
  GetOriginalSongInfoError,
  GetSearchPageData,
  GetSearchPageError,
  GetSongDetailsData,
  GetSongDetailsError,
  GetSongLikesCountData,
  GetSongLikesCountError,
  GetSongsForAlbumCreationData,
  GetSongsForAlbumCreationError,
  GetSteadyAlbumsData,
  GetSteadyAlbumsError,
  InitMemberInfoData,
  InitMemberInfoError,
  InitMemberInfoPayload,
  LogoutData,
  LogoutError,
  ModifyCommentData,
  ModifyCommentError,
  SearchAlbumsData,
  SearchAlbumsError,
  ToggleIsPublicData,
  ToggleIsPublicError,
  Type멜팅곡등록요청,
  UpdateAlbumDescriptionData,
  UpdateAlbumDescriptionError,
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
   * @tags song-controller
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
   * @tags song-controller
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
   * @tags song-controller
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
   * @tags song-controller
   * @name CreateMeltingSong
   * @summary 멜팅 곡 생성 API
   * @request POST:/api/v1/songs/melting
   * @response `200` `CreateMeltingSongData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  createMeltingSong = (data: Type멜팅곡등록요청, params: RequestParams = {}) =>
    this.request<CreateMeltingSongData, CreateMeltingSongError>({
      path: `/api/v1/songs/melting`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    })
  /**
   * No description
   *
   * @tags song-controller
   * @name CreateAicoverSong
   * @summary AI Cover 곡 생성 API
   * @request POST:/api/v1/songs/aicover
   * @response `200` `CreateAicoverSongData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  createAicoverSong = (data: AI커버곡등록요청, params: RequestParams = {}) =>
    this.request<CreateAicoverSongData, CreateAicoverSongError>({
      path: `/api/v1/songs/aicover`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags member-controller
   * @name GetMemberHashtags
   * @request GET:/api/v1/members/me/hashtags
   * @response `200` `GetMemberHashtagsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getMemberHashtags = (params: RequestParams = {}) =>
    this.request<GetMemberHashtagsData, GetMemberHashtagsError>({
      path: `/api/v1/members/me/hashtags`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags member-controller
   * @name AddMemberHashtag
   * @request POST:/api/v1/members/me/hashtags
   * @response `200` `AddMemberHashtagData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  addMemberHashtag = (
    query: {
      content: string
    },
    params: RequestParams = {},
  ) =>
    this.request<AddMemberHashtagData, AddMemberHashtagError>({
      path: `/api/v1/members/me/hashtags`,
      method: 'POST',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags member-controller
   * @name DeleteMemberHashtag
   * @request DELETE:/api/v1/members/me/hashtags
   * @response `200` `DeleteMemberHashtagData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  deleteMemberHashtag = (
    query: {
      content: string
    },
    params: RequestParams = {},
  ) =>
    this.request<DeleteMemberHashtagData, DeleteMemberHashtagError>({
      path: `/api/v1/members/me/hashtags`,
      method: 'DELETE',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags album-controller
   * @name GetAlbums
   * @request GET:/api/v1/albums
   * @response `200` `GetAlbumsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getAlbums = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      sort?: number
      /**
       * @format int32
       * @default 0
       */
      page?: number
      /**
       * @format int32
       * @default 10
       */
      size?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<GetAlbumsData, GetAlbumsError>({
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
  createAlbum = (data: CreateAlbumPayload, params: RequestParams = {}) =>
    this.request<CreateAlbumData, CreateAlbumError>({
      path: `/api/v1/albums`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    })
  /**
   * No description
   *
   * @tags album-controller
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
   * @tags album-controller
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
   * @tags album-controller
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
   * @tags album-controller
   * @name CreateAiDescription
   * @request POST:/api/v1/albums/{albumId}/descriptions
   * @response `200` `CreateAiDescriptionData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  createAiDescription = (
    albumId: number,
    data: AiDescriptionRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<CreateAiDescriptionData, CreateAiDescriptionError>({
      path: `/api/v1/albums/${albumId}/descriptions`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
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
       * @default 10
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
   * @tags album-controller
   * @name CreateAiAlbumCoverImage
   * @request POST:/api/v1/albums/covers
   * @response `200` `CreateAiAlbumCoverImageData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  createAiAlbumCoverImage = (
    data: AiCoverImageRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<CreateAiAlbumCoverImageData, CreateAiAlbumCoverImageError>({
      path: `/api/v1/albums/covers`,
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
   * @name DeleteAlbum
   * @request DELETE:/api/v1/albums/{albumId}
   * @response `200` `DeleteAlbumData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  deleteAlbum = (albumId: number, params: RequestParams = {}) =>
    this.request<DeleteAlbumData, DeleteAlbumError>({
      path: `/api/v1/albums/${albumId}`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @tags album-controller
   * @name UpdateAlbumDescription
   * @request PATCH:/api/v1/albums/{albumId}
   * @response `200` `UpdateAlbumDescriptionData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  updateAlbumDescription = (
    albumId: number,
    data: AlbumUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<UpdateAlbumDescriptionData, UpdateAlbumDescriptionError>({
      path: `/api/v1/albums/${albumId}`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags album-controller
   * @name ToggleIsPublic
   * @request PATCH:/api/v1/albums/{albumId}/toggle
   * @response `200` `ToggleIsPublicData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  toggleIsPublic = (albumId: number, params: RequestParams = {}) =>
    this.request<ToggleIsPublicData, ToggleIsPublicError>({
      path: `/api/v1/albums/${albumId}/toggle`,
      method: 'PATCH',
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
   * @name GetSongsForAlbumCreation
   * @request GET:/api/v1/songs
   * @response `200` `GetSongsForAlbumCreationData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getSongsForAlbumCreation = (
    query?: {
      keyword?: string
      /**
       * @format int32
       * @default 0
       */
      page?: number
      /**
       * @format int32
       * @default 10
       */
      size?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<GetSongsForAlbumCreationData, GetSongsForAlbumCreationError>({
      path: `/api/v1/songs`,
      method: 'GET',
      query: query,
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
   * @name GetSearchPage
   * @request GET:/api/v1/original-songs
   * @response `200` `GetSearchPageData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getSearchPage = (
    query?: {
      keyword?: string
      /**
       * @format int32
       * @default 0
       */
      page?: number
      /**
       * @format int32
       * @default 10
       */
      size?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<GetSearchPageData, GetSearchPageError>({
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
   * @summary 마이페이지에서 사용자가 생성한 곡 목록
   * @request GET:/api/v1/members/me/songs
   * @response `200` `GetMemberSongsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getMemberSongs = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number
      /**
       * @format int32
       * @default 10
       */
      size?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<GetMemberSongsData, GetMemberSongsError>({
      path: `/api/v1/members/me/songs`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * @description 3개 이상이면 AI Cover 가능
   *
   * @tags member-controller
   * @name GetMeltingCounts
   * @summary 사용자가 멜팅한 곡 개수 조회
   * @request GET:/api/v1/members/me/songcounts
   * @response `200` `GetMeltingCountsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getMeltingCounts = (params: RequestParams = {}) =>
    this.request<GetMeltingCountsData, GetMeltingCountsError>({
      path: `/api/v1/members/me/songcounts`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags member-controller
   * @name GetMemberLikesSongs
   * @request GET:/api/v1/members/me/likes/songs
   * @response `200` `GetMemberLikesSongsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getMemberLikesSongs = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      sort?: number
      /**
       * @format int32
       * @default 0
       */
      page?: number
      /**
       * @format int32
       * @default 10
       */
      size?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<GetMemberLikesSongsData, GetMemberLikesSongsError>({
      path: `/api/v1/members/me/likes/songs`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags member-controller
   * @name GetMemberLikesAlbums
   * @request GET:/api/v1/members/me/likes/albums
   * @response `200` `GetMemberLikesAlbumsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getMemberLikesAlbums = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      sort?: number
      /**
       * @format int32
       * @default 0
       */
      page?: number
      /**
       * @format int32
       * @default 10
       */
      size?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<GetMemberLikesAlbumsData, GetMemberLikesAlbumsError>({
      path: `/api/v1/members/me/likes/albums`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags member-controller
   * @name GetMemberAlbums
   * @request GET:/api/v1/members/me/albums
   * @response `200` `GetMemberAlbumsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getMemberAlbums = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      sort?: number
      /**
       * @format int32
       * @default 0
       */
      page?: number
      /**
       * @format int32
       * @default 10
       */
      size?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<GetMemberAlbumsData, GetMemberAlbumsError>({
      path: `/api/v1/members/me/albums`,
      method: 'GET',
      query: query,
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
   * @name GetSteadyAlbums
   * @request GET:/api/v1/albums/steady
   * @response `200` `GetSteadyAlbumsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getSteadyAlbums = (params: RequestParams = {}) =>
    this.request<GetSteadyAlbumsData, GetSteadyAlbumsError>({
      path: `/api/v1/albums/steady`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags album-controller
   * @name SearchAlbums
   * @request GET:/api/v1/albums/search
   * @response `200` `SearchAlbumsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  searchAlbums = (
    query: {
      /**
       * @format int32
       * @default 0
       */
      page?: number
      /**
       * @format int32
       * @default 10
       */
      size?: number
      keyword?: string
      options: string[]
    },
    params: RequestParams = {},
  ) =>
    this.request<SearchAlbumsData, SearchAlbumsError>({
      path: `/api/v1/albums/search`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags album-controller
   * @name GetMonthlyAlbums
   * @request GET:/api/v1/albums/monthly
   * @response `200` `GetMonthlyAlbumsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getMonthlyAlbums = (params: RequestParams = {}) =>
    this.request<GetMonthlyAlbumsData, GetMonthlyAlbumsError>({
      path: `/api/v1/albums/monthly`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags album-controller
   * @name GetAllGenres
   * @request GET:/api/v1/albums/genres
   * @response `200` `GetAllGenresData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getAllGenres = (params: RequestParams = {}) =>
    this.request<GetAllGenresData, GetAllGenresError>({
      path: `/api/v1/albums/genres`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags album-controller
   * @name GetHot5Albums
   * @request GET:/api/v1/albums/daily
   * @response `200` `GetHot5AlbumsData` OK
   * @response `500` `ErrorResponse` Internal Server Error
   */
  getHot5Albums = (params: RequestParams = {}) =>
    this.request<GetHot5AlbumsData, GetHot5AlbumsError>({
      path: `/api/v1/albums/daily`,
      method: 'GET',
      ...params,
    })
}
