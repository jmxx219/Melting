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

export interface AlbumDetail {}
