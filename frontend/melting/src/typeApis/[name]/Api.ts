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
  AddMemberHashtagData,
  AddMemberHashtagError,
  DeleteMemberHashtagData,
  DeleteMemberHashtagError,
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
  InitMemberInfoData,
  InitMemberInfoError,
  InitMemberInfoPayload,
  LogoutData,
  LogoutError,
  UpdateMemberInfoData,
  UpdateMemberInfoError,
  UpdateMemberInfoPayload,
  ValidateNicknameData,
  ValidateNicknameError,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
}
