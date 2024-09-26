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

export interface ErrorResponse {
  errorMessage?:
    | 'MEMBER_NOT_FOUND'
    | 'DUPLICATE_NICKNAME'
    | 'INCORRECT_IMAGE_EXTENSION'
    | 'MEMBER_BAD_REQUEST'
    | 'ALBUM_NOT_FOUND'
    | 'INVALID_SORT_CRITERIA'
    | 'INVALID_SONG_COUNT'
    | 'SEARCH_QUERY_TOO_SHORT'
    | 'ALBUM_NAME_BLANK_ERROR'
    | 'ALBUM_COVER_IMAGE_BLANK_ERROR'
    | 'ALBUM_SONGS_EMPTY_ERROR'
}

export interface ApiResponseString {
  status?: string
  data?: string
  errorMessage?: string
}

export interface MemberInitRequestDto {
  nick_name?: string
  gender?: string
}

export interface ApiResponseMemberResponseDto {
  status?: string
  data?: MemberResponseDto
  errorMessage?: string
}

export interface MemberResponseDto {
  nickname?: string
  profile_image_url?: string
}

export interface ApiResponseBoolean {
  status?: string
  data?: boolean
  errorMessage?: string
}

export interface ApiResponseVoid {
  status?: string
  data?: object
  errorMessage?: string
}

export type ReissueData = ApiResponseString

export type ReissueError = ErrorResponse

export interface InitMemberInfoPayload {
  /** @format binary */
  multipartFile: File
  memberInitRequestDto?: MemberInitRequestDto
}

export type InitMemberInfoData = ApiResponseMemberResponseDto

export type InitMemberInfoError = ErrorResponse

export type ValidateNicknameData = ApiResponseBoolean

export type ValidateNicknameError = ErrorResponse

export type LogoutData = ApiResponseVoid

export type LogoutError = ErrorResponse
