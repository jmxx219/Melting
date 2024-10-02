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

export interface ApiResponseInteger {
  status?: string
  /** @format int32 */
  data?: number
  errorMessage?: string
}

export interface ApiResponseString {
  status?: string
  data?: string
  errorMessage?: string
}

export interface Type보이스등록요청 {
  /** @format int64 */
  original_song_id: number
  /** @format binary */
  voice_file: File
}

export interface ApiResponseVoiceCreateResponseDto {
  status?: string
  data?: VoiceCreateResponseDto
  errorMessage?: string
}

export interface VoiceCreateResponseDto {
  /** @format int64 */
  voice_id?: number
}

export interface Album {
  /** @format date-time */
  createdAt?: string
  /** @format date-time */
  lastModifiedAt?: string
  /** @format int64 */
  id?: number
  member?: Member
  albumName?: string
  category?: 'SINGLE' | 'MINI' | 'LP'
  albumDescription?: string
  albumCoverImage?: string
  isPublic?: boolean
  isDeleted?: boolean
  songs?: Song[]
  hashtags?: AlbumHashtag[]
  genres?: AlbumGenre[]
  likesAlbums?: LikesAlbum[]
  comments?: Comment[]
}

export interface AlbumCreateRequestDto {
  album_name: string
  album_cover_image?: string
  album_description?: string
  songs: Song[]
  hashtags?: Hashtag[]
  genres?: Genre[]
}

export interface AlbumGenre {
  /** @format int64 */
  id?: number
  album?: Album
  genre?: Genre
}

export interface AlbumHashtag {
  /** @format int64 */
  id?: number
  album?: Album
  hashtag?: Hashtag
}

export interface Comment {
  /** @format date-time */
  createdAt?: string
  /** @format date-time */
  lastModifiedAt?: string
  /** @format int64 */
  id?: number
  album?: Album
  member?: Member
  content?: string
  deleted?: boolean
}

export interface Genre {
  /** @format int64 */
  id?: number
  content?: string
  albumGenres?: AlbumGenre[]
}

export interface Hashtag {
  /** @format int64 */
  id?: number
  content?: string
  albumHashtags?: AlbumHashtag[]
}

export interface LikesAlbum {
  /** @format int64 */
  id?: number
  album?: Album
  member?: Member
  status?: boolean
}

export interface LikesSong {
  /** @format int64 */
  id?: number
  song?: Song
  member?: Member
  status?: boolean
}

export interface Member {
  /** @format date-time */
  createdAt?: string
  /** @format date-time */
  lastModifiedAt?: string
  /** @format int64 */
  id?: number
  email?: string
  gender?: 'MALE' | 'FEMALE'
  profileImageExtension?: string
  nickname?: string
  provider?: 'KAKAO' | 'GOOGLE'
  likesAlbums?: LikesAlbum[]
  likesSongs?: LikesSong[]
  comments?: Comment[]
  /** @format int32 */
  coverCount?: number
  deleted?: boolean
}

export interface OriginalSong {
  /** @format date-time */
  createdAt?: string
  /** @format date-time */
  lastModifiedAt?: string
  /** @format int64 */
  id?: number
  title?: string
  artist?: string
  artistGender?: 'MALE' | 'FEMALE'
  coverImageUrl?: string
  mrUrl?: string
  voiceUrl?: string
  lyrics?: string
}

export interface Song {
  /** @format date-time */
  createdAt?: string
  /** @format date-time */
  lastModifiedAt?: string
  /** @format int64 */
  id?: number
  originalSong?: OriginalSong
  member?: Member
  album?: Album
  songType?: 'MELTING' | 'AICOVER'
  songUrl?: string
  /** @format int32 */
  trackNumber?: number
  isTitle?: boolean
  likesSongs?: LikesSong[]
  deleted?: boolean
}

export interface AlbumUpdateResponseDto {
  /** @format int64 */
  album_id?: number
}

export interface ApiResponseAlbumUpdateResponseDto {
  status?: string
  data?: AlbumUpdateResponseDto
  errorMessage?: string
}

export interface CommentRequestDto {
  content?: string
}

export interface ApiResponseCommentResponseDto {
  status?: string
  data?: CommentResponseDto
  errorMessage?: string
}

export interface CommentResponseDto {
  /** @format int64 */
  comment_id?: number
  writer_profile_image?: string
  writer_nickname?: string
  content?: string
  /** @format date-time */
  created_at?: string
}

export interface MemberUpdateRequestDto {
  nickname?: string
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

export interface MemberInitRequestDto {
  nickname?: string
  gender?: string
}

export interface AlbumUpdateRequestDto {
  album_name?: string
  album_description?: string
}

export interface ApiResponseSongDetailsResponseDto {
  status?: string
  data?: SongDetailsResponseDto
  errorMessage?: string
}

export interface SongDetailsResponseDto {
  /** @format int64 */
  song_id?: number
  song_title?: string
  nickname?: string
  artist?: string
  album_cover_image?: string
  /** @format int32 */
  liked_count?: number
  song_url?: string
}

export interface ApiResponseListOriginalSongSearchResponseDto {
  status?: string
  data?: OriginalSongSearchResponseDto[]
  errorMessage?: string
}

export interface OriginalSongSearchResponseDto {
  title?: string
  artist?: string
  cover_image_url?: string
}

export interface ApiResponseOriginalSongResponseDto {
  status?: string
  data?: OriginalSongResponseDto
  errorMessage?: string
}

export interface OriginalSongResponseDto {
  title?: string
  artist?: string
  album_cover_url?: string
  mr_url?: string
  lyrics?: string
}

export interface ApiResponseBoolean {
  status?: string
  data?: boolean
  errorMessage?: string
}

export interface ApiResponseMemberSongResponseDto {
  status?: string
  data?: MemberSongResponseDto
  errorMessage?: string
}

export interface MemberSongResponseDto {
  mySongList?: SongListDto[]
  isPossibleAiCover?: boolean
}

export interface SongListDto {
  /** @format int64 */
  originalSongId?: number
  songTitle?: string
  artist?: string
  songList?: SongMypageDto[]
}

export interface SongMypageDto {
  /** @format int64 */
  songId?: number
  albumCoverImageUrl?: string
  songType?: 'MELTING' | 'AICOVER'
  /** @format int32 */
  likeCount?: number
  isLiked?: boolean
}

export interface ApiResponseVoid {
  status?: string
  data?: object
  errorMessage?: string
}

export interface AlbumMainResponseDto {
  album_cover_image?: string
  album_name?: string
  nickname?: string
}

export interface ApiResponseListAlbumMainResponseDto {
  status?: string
  data?: AlbumMainResponseDto[]
  errorMessage?: string
}

export interface AlbumDetailsResponseDto {
  /** @format int64 */
  album_id?: number
  album_cover_image?: string
  album_name?: string
  nickname?: string
  /** @format int32 */
  album_liked?: number
  category?: 'SINGLE' | 'MINI' | 'LP'
  genres?: AlbumGenre[]
  album_description?: string
}

export interface ApiResponseAlbumDetailsResponseDto {
  status?: string
  data?: AlbumDetailsResponseDto
  errorMessage?: string
}

export interface ApiResponseListCommentResponseDto {
  status?: string
  data?: CommentResponseDto[]
  errorMessage?: string
}

export interface AlbumSearchResponseDto {
  album_cover_image?: string
  album_name?: string
  nickname?: string
}

export interface ApiResponseListAlbumSearchResponseDto {
  status?: string
  data?: AlbumSearchResponseDto[]
  errorMessage?: string
}

export type GetSongLikesCountData = ApiResponseInteger

export type GetSongLikesCountError = ErrorResponse

export type AddSongLikesData = ApiResponseInteger

export type AddSongLikesError = ErrorResponse

export type DeleteSongLikesData = ApiResponseInteger

export type DeleteSongLikesError = ErrorResponse

export type ReissueData = ApiResponseString

export type ReissueError = ErrorResponse

export type AddVoiceData = ApiResponseVoiceCreateResponseDto

export type AddVoiceError = ErrorResponse

export type GetAlbumsInCommunityMainPageData =
  ApiResponseListAlbumMainResponseDto

export type GetAlbumsInCommunityMainPageError = ErrorResponse

export type CreateAlbumData = ApiResponseAlbumUpdateResponseDto

export type CreateAlbumError = ErrorResponse

export type GetAlbumLikesCountData = ApiResponseInteger

export type GetAlbumLikesCountError = ErrorResponse

export type AddAlbumLikesData = ApiResponseInteger

export type AddAlbumLikesError = ErrorResponse

export type DeleteAlbumLikesData = ApiResponseInteger

export type DeleteAlbumLikesError = ErrorResponse

export type GetAllCommentsData = ApiResponseListCommentResponseDto

export type GetAllCommentsError = ErrorResponse

export type WriteCommentData = ApiResponseCommentResponseDto

export type WriteCommentError = ErrorResponse

export type GetMemberInfoData = MemberResponseDto

export type GetMemberInfoError = ErrorResponse

export interface UpdateMemberInfoPayload {
  /** @format binary */
  multipartFile: File
  memberUpdateRequestDto: MemberUpdateRequestDto
}

export type UpdateMemberInfoData = ApiResponseMemberResponseDto

export type UpdateMemberInfoError = ErrorResponse

export interface InitMemberInfoPayload {
  /** @format binary */
  multipartFile: File
  memberInitRequestDto: MemberInitRequestDto
}

export type InitMemberInfoData = ApiResponseMemberResponseDto

export type InitMemberInfoError = ErrorResponse

export type GetAlbumDetailsData = ApiResponseAlbumDetailsResponseDto

export type GetAlbumDetailsError = ErrorResponse

export type UpdateAlbumData = ApiResponseAlbumUpdateResponseDto

export type UpdateAlbumError = ErrorResponse

export type DeleteCommentData = ApiResponseCommentResponseDto

export type DeleteCommentError = ErrorResponse

export type ModifyCommentData = ApiResponseCommentResponseDto

export type ModifyCommentError = ErrorResponse

export type GetSongDetailsData = ApiResponseSongDetailsResponseDto

export type GetSongDetailsError = ErrorResponse

export type GetSearchListData = ApiResponseListOriginalSongSearchResponseDto

export type GetSearchListError = ErrorResponse

export type GetOriginalSongInfoData = ApiResponseOriginalSongResponseDto

export type GetOriginalSongInfoError = ErrorResponse

export type ValidateNicknameData = ApiResponseBoolean

export type ValidateNicknameError = ErrorResponse

export type GetMemberSongsData = ApiResponseMemberSongResponseDto

export type GetMemberSongsError = ErrorResponse

export type LogoutData = ApiResponseVoid

export type LogoutError = ErrorResponse

export type SearchAlbumsByKeywordData = ApiResponseListAlbumSearchResponseDto

export type SearchAlbumsByKeywordError = ErrorResponse
