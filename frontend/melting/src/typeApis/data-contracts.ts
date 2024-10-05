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
    | 'MEMBER_HASHTAG_FULL'
    | 'MEMBER_HASHTAG_EMPTY'
    | 'MEMBER_HASHTAG_EXIST'
    | 'MEMBER_HASHTAG_BAD_REQUEST'
    | 'SONG_NOT_FOUND'
    | 'SONG_ALREADY_INCLUDED'
    | 'GENRE_NOT_FOUND'
    | 'HASHTAG_NOT_FOUND'
    | 'ALBUM_NOT_FOUND'
    | 'INVALID_SORT_CRITERIA'
    | 'INVALID_SONG_COUNT'
    | 'SEARCH_QUERY_TOO_SHORT'
    | 'ALBUM_NAME_BLANK_ERROR'
    | 'ALBUM_COVER_IMAGE_BLANK_ERROR'
    | 'ALBUM_LIKES_NOT_FOUND'
    | 'REDIS_SCORE_EMPTY'
    | 'SONG_LIKES_NOT_FOUND'
    | 'INVALID_FILE_TYPE'
    | 'ALBUM_SONGS_EMPTY_ERROR'
}

export interface ApiResponseInteger {
  status?: string
  /** @format int32 */
  data?: number
  errorMessage?: string
}

export interface Type멜팅곡등록요청 {
  /** @format int64 */
  originalSongId: number
  /** @format binary */
  voiceFile: File
}

export interface ApiResponseBoolean {
  status?: string
  data?: boolean
  errorMessage?: string
}

export interface AI커버곡등록요청 {
  /** @format int64 */
  originalSongId?: number
}

export interface ApiResponseListString {
  status?: string
  data?: string[]
  errorMessage?: string
}

export interface AlbumCreateRequestDto {
  albumName?: string
  albumDescription?: string
  songs?: number[]
  /** @format int64 */
  titleSongId?: number
  genres?: string[]
  hashtags?: string[]
  /** @format int32 */
  defaultCoverNumber?: number
}

export interface AlbumDetailsResponseDto {
  /** @format int64 */
  albumId?: number
  albumName?: string
  albumCreatorNickname?: string
  albumCreatorProfileImageUrl?: string
  albumDescription?: string
  /** @format date-time */
  createdAt?: string
  category?: 'SINGLE' | 'MINI' | 'LP'
  songs?: SongDetailsResponseDto[]
  hashtags?: string[]
  genres?: string[]
  comments?: CommentResponseDto[]
  /** @format int32 */
  commentCount?: number
  isLiked?: boolean
  /** @format int32 */
  likedCount?: number
}

export interface ApiResponseAlbumDetailsResponseDto {
  status?: string
  data?: AlbumDetailsResponseDto
  errorMessage?: string
}

export interface CommentResponseDto {
  /** @format int64 */
  commentId?: number
  writerProfileImage?: string
  writerNickname?: string
  content?: string
  isMyComment?: boolean
  /** @format date-time */
  createdAt?: string
}

export interface SongDetailsResponseDto {
  /** @format int64 */
  songId?: number
  songTitle?: string
  nickname?: string
  artist?: string
  albumCoverImageUrl?: string
  isLiked?: boolean
  /** @format int32 */
  likedCount?: number
  songUrl?: string
  lyrics?: string
}

export interface AiDescriptionRequestDto {
  songs?: number[]
  hashtags?: number[]
  genres?: number[]
}

export interface ApiResponseString {
  status?: string
  data?: string
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

export interface AiCoverImageRequestDto {
  songs?: number[]
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
  profileImageUrl?: string
}

export interface MemberInitRequestDto {
  nickname?: string
  gender?: string
}

export interface AlbumUpdateRequestDto {
  description?: string
}

export interface ApiResponseSongSearchPageResponseDto {
  status?: string
  data?: SongSearchPageResponseDto
  errorMessage?: string
}

export interface SongSearchPageResponseDto {
  songSearchResponseDtoList?: SongSearchResponseDto[]
  isLast?: boolean
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  /** @format int32 */
  totalPages?: number
  /** @format int64 */
  totalElements?: number
  /** @format int32 */
  numberOfElements?: number
}

export interface SongSearchResponseDto {
  originalSongTitle?: string
  originalSongArtist?: string
  albumCoverImage?: string
  /** @format int64 */
  meltingSongId?: number
  /** @format int64 */
  aiCoverSongId?: number
}

export interface ApiResponseSongDetailsResponseDto {
  status?: string
  data?: SongDetailsResponseDto
  errorMessage?: string
}

export interface ApiResponseOriginalSongSearchPageResponseDto {
  status?: string
  data?: OriginalSongSearchPageResponseDto
  errorMessage?: string
}

export interface OriginalSongSearchPageResponseDto {
  originalSongPage?: OriginalSongSearchResponseDto[]
  isLast?: boolean
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  /** @format int32 */
  totalPages?: number
  /** @format int64 */
  totalElements?: number
  /** @format int32 */
  numberOfElements?: number
}

export interface OriginalSongSearchResponseDto {
  /** @format int64 */
  originalSongId?: number
  title?: string
  artist?: string
  coverImageUrl?: string
}

export interface ApiResponseOriginalSongResponseDto {
  status?: string
  data?: OriginalSongResponseDto
  errorMessage?: string
}

export interface OriginalSongResponseDto {
  /** @format int64 */
  originalSongId?: number
  title?: string
  artist?: string
  albumCoverUrl?: string
  mrUrl?: string
  lyrics?: string
}

export interface ApiResponseSongMypagePageResponseDto {
  status?: string
  data?: SongMypagePageResponseDto
  errorMessage?: string
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
  isCreated?: boolean
  /** @format date-time */
  lastModifiedAt?: string
}

export interface SongMypagePageResponseDto {
  mySongList?: SongListDto[]
  isPossibleAiCover?: boolean
  isLast?: boolean
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  /** @format int32 */
  totalPages?: number
  /** @format int64 */
  totalElements?: number
  /** @format int32 */
  numberOfElements?: number
}

export interface ApiResponseMemberSongCountsResponseDto {
  status?: string
  data?: MemberSongCountsResponseDto
  errorMessage?: string
}

export interface MemberSongCountsResponseDto {
  /** @format int32 */
  songcounts?: number
}

export interface ApiResponseSongLikesPageResponseDto {
  status?: string
  data?: SongLikesPageResponseDto
  errorMessage?: string
}

export interface SongLikesPageResponseDto {
  songLikesList?: SongLikesResponseDto[]
  isLast?: boolean
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  /** @format int32 */
  totalPages?: number
  /** @format int64 */
  totalElements?: number
  /** @format int32 */
  numberOfElements?: number
}

export interface SongLikesResponseDto {
  /** @format int64 */
  songId?: number
  title?: string
  albumCoverImageUrl?: string
  creatorNickname?: string
  artist?: string
  isLiked?: boolean
  /** @format int32 */
  likedCount?: number
  /** @format int32 */
  lengthInSeconds?: number
}

export interface AlbumMyPageResponseDto {
  albumInfoList?: AlbumMyResponseDto[]
  isLast?: boolean
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  /** @format int32 */
  totalPages?: number
  /** @format int64 */
  totalElements?: number
  /** @format int32 */
  numberOfElements?: number
}

export interface AlbumMyResponseDto {
  /** @format int64 */
  albumId?: number
  albumName?: string
  albumCoverImageUrl?: string
  creatorNickname?: string
  /** @format date-time */
  createdAt?: string
  isPublic?: boolean
  isLiked?: boolean
  /** @format int32 */
  likedCount?: number
}

export interface ApiResponseAlbumMyPageResponseDto {
  status?: string
  data?: AlbumMyPageResponseDto
  errorMessage?: string
}

export interface ApiResponseVoid {
  status?: string
  data?: object
  errorMessage?: string
}

export interface AlbumSearchPageResponseDto {
  albumInfoList?: AlbumSearchResponseDto[]
  isLast?: boolean
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  /** @format int32 */
  totalPages?: number
  /** @format int64 */
  totalElements?: number
  /** @format int32 */
  numberOfElements?: number
}

export interface AlbumSearchResponseDto {
  /** @format int64 */
  albumId?: number
  albumName?: string
  creatorNickname?: string
  /** @format date-time */
  createdAt?: string
}

export interface ApiResponseAlbumSearchPageResponseDto {
  status?: string
  data?: AlbumSearchPageResponseDto
  errorMessage?: string
}

export interface ApiResponseCommentPageResponseDto {
  status?: string
  data?: CommentPageResponseDto
  errorMessage?: string
}

export interface CommentPageResponseDto {
  commentPage?: CommentResponseDto[]
  isLast?: boolean
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  /** @format int32 */
  totalPages?: number
  /** @format int64 */
  totalElements?: number
  /** @format int32 */
  numberOfElements?: number
}

export interface AlbumRankingResponseDto {
  /** @format int64 */
  albumId?: number
  albumName?: string
  creatorNickname?: string
  albumCoverImageUrl?: string
}

export interface ApiResponseListAlbumRankingResponseDto {
  status?: string
  data?: AlbumRankingResponseDto[]
  errorMessage?: string
}

export interface ApiResponseListGenreResponseDto {
  status?: string
  data?: GenreResponseDto[]
  errorMessage?: string
}

export interface GenreResponseDto {
  /** @format int64 */
  id?: number
  content?: string
}

export type GetSongLikesCountData = ApiResponseInteger

export type GetSongLikesCountError = ErrorResponse

export type AddSongLikesData = ApiResponseInteger

export type AddSongLikesError = ErrorResponse

export type DeleteSongLikesData = ApiResponseInteger

export type DeleteSongLikesError = ErrorResponse

export type CreateMeltingSongData = ApiResponseBoolean

export type CreateMeltingSongError = ErrorResponse

export type CreateAicoverSongData = ApiResponseBoolean

export type CreateAicoverSongError = ErrorResponse

export type GetMemberHashtagsData = ApiResponseListString

export type GetMemberHashtagsError = ErrorResponse

export type AddMemberHashtagData = ApiResponseListString

export type AddMemberHashtagError = ErrorResponse

export type DeleteMemberHashtagData = ApiResponseListString

export type DeleteMemberHashtagError = ErrorResponse

export type GetAlbumsData = ApiResponseAlbumSearchPageResponseDto

export type GetAlbumsError = ErrorResponse

export interface CreateAlbumPayload {
  albumCreateRequestDto: AlbumCreateRequestDto
  /** @format binary */
  albumCoverImage?: File
}

export type CreateAlbumData = ApiResponseAlbumDetailsResponseDto

export type CreateAlbumError = ErrorResponse

export type GetAlbumLikesCountData = ApiResponseInteger

export type GetAlbumLikesCountError = ErrorResponse

export type AddAlbumLikesData = ApiResponseInteger

export type AddAlbumLikesError = ErrorResponse

export type DeleteAlbumLikesData = ApiResponseInteger

export type DeleteAlbumLikesError = ErrorResponse

export type CreateAiDescriptionData = ApiResponseString

export type CreateAiDescriptionError = ErrorResponse

export type GetAllCommentsData = ApiResponseCommentPageResponseDto

export type GetAllCommentsError = ErrorResponse

export type WriteCommentData = ApiResponseCommentResponseDto

export type WriteCommentError = ErrorResponse

export type CreateAiAlbumCoverImageData = ApiResponseString

export type CreateAiAlbumCoverImageError = ErrorResponse

export type GetMemberInfoData = ApiResponseMemberResponseDto

export type GetMemberInfoError = ErrorResponse

export interface UpdateMemberInfoPayload {
  /** @format binary */
  multipartFile?: File
  memberUpdateRequestDto: MemberUpdateRequestDto
}

export type UpdateMemberInfoData = ApiResponseMemberResponseDto

export type UpdateMemberInfoError = ErrorResponse

export interface InitMemberInfoPayload {
  /** @format binary */
  multipartFile?: File
  memberInitRequestDto: MemberInitRequestDto
}

export type InitMemberInfoData = ApiResponseMemberResponseDto

export type InitMemberInfoError = ErrorResponse

export type GetAlbumDetailsData = ApiResponseAlbumDetailsResponseDto

export type GetAlbumDetailsError = ErrorResponse

export type DeleteAlbumData = ApiResponseVoid

export type DeleteAlbumError = ErrorResponse

export type UpdateAlbumDescriptionData = ApiResponseAlbumDetailsResponseDto

export type UpdateAlbumDescriptionError = ErrorResponse

export type ToggleIsPublicData = ApiResponseBoolean

export type ToggleIsPublicError = ErrorResponse

export type DeleteCommentData = ApiResponseCommentResponseDto

export type DeleteCommentError = ErrorResponse

export type ModifyCommentData = ApiResponseCommentResponseDto

export type ModifyCommentError = ErrorResponse

export type GetSongsForAlbumCreationData = ApiResponseSongSearchPageResponseDto

export type GetSongsForAlbumCreationError = ErrorResponse

export type GetSongDetailsData = ApiResponseSongDetailsResponseDto

export type GetSongDetailsError = ErrorResponse

export type GetSearchPageData = ApiResponseOriginalSongSearchPageResponseDto

export type GetSearchPageError = ErrorResponse

export type GetOriginalSongInfoData = ApiResponseOriginalSongResponseDto

export type GetOriginalSongInfoError = ErrorResponse

export type ValidateNicknameData = ApiResponseBoolean

export type ValidateNicknameError = ErrorResponse

export type GetMemberSongsData = ApiResponseSongMypagePageResponseDto

export type GetMemberSongsError = ErrorResponse

export type GetMeltingCountsData = ApiResponseMemberSongCountsResponseDto

export type GetMeltingCountsError = ErrorResponse

export type GetMemberLikesSongsData = ApiResponseSongLikesPageResponseDto

export type GetMemberLikesSongsError = ErrorResponse

export type GetMemberLikesAlbumsData = ApiResponseAlbumMyPageResponseDto

export type GetMemberLikesAlbumsError = ErrorResponse

export type GetMemberAlbumsData = ApiResponseAlbumMyPageResponseDto

export type GetMemberAlbumsError = ErrorResponse

export type LogoutData = ApiResponseVoid

export type LogoutError = ErrorResponse

export type GetSteadyAlbumsData = ApiResponseListAlbumRankingResponseDto

export type GetSteadyAlbumsError = ErrorResponse

export type SearchAlbumsData = ApiResponseAlbumSearchPageResponseDto

export type SearchAlbumsError = ErrorResponse

export type GetMonthlyAlbumsData = ApiResponseListAlbumRankingResponseDto

export type GetMonthlyAlbumsError = ErrorResponse

export type GetAllGenresData = ApiResponseListGenreResponseDto

export type GetAllGenresError = ErrorResponse

export type GetHot5AlbumsData = ApiResponseListAlbumRankingResponseDto

export type GetHot5AlbumsError = ErrorResponse
