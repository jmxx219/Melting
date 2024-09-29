import { LikedSongType, Song } from './song'

export interface AlbumForm {
  tracks: Song[]
  albumName: string
  albumDescription: string
  genre: string[]
  hashtags: string[]
  albumCoverImage: File | null
}

export interface BestAlbum {
  albumId: number
  albumName: string
  nickname: string
  albumCoverImage: string
}

export interface AlbumDetail {
  albumInfo: AlbumDetailInfoType
  albumId: number
  songs: AlbumSongType[]
  comments: AlbumCommentType[]
  commentCnt: number
}

export interface AlbumDetailInfoType {
  albumCoverImage: string
  albumName: string
  like: number
  commentCnt: number
  isLike: boolean
  nickname: string
  profileImage: string
  createDate: string
  genres: string[]
  type: string
  description: string
  hashtags: string[]
}

export type AlbumSongType = LikedSongType & {
  isTitle: boolean
}

export type AlbumCommentType = {
  member: string
  content: string
  createdAt: string
  profileImg: string
}