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
  InitMemberInfoData,
  InitMemberInfoError,
  InitMemberInfoPayload,
  LogoutData,
  LogoutError,
  ReissueData,
  ReissueError,
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
