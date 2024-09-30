import { CoverType } from './constType'

export type Song = {
  songId: number
  albumCoverImgUrl: string
  songTitle: string
  nickname?: string
  artist: string
  songType?: CoverType
}

export interface SongListProps {
  songs: Song[]
  showNumbers: boolean
  selectId: number
}

export type LikedSongType = {
  songId: number
  albumCoverImgUrl: string
  artist: string
  songTitle: string
  nickname: string
  executionTime: string
  likeCount: number
  isLiked: boolean
}
