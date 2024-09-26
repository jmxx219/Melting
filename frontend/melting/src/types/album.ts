import { Song } from './song'

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
  albumTop: AlbumDetailInfo
  albumId: number
  genre: string[]
  tracks: Song[]
  albumDescription: string
}

export interface AlbumDetailInfo {
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
}
