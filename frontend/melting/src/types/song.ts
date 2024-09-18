// export interface Song {
//   id: number
//   title: string
//   artist: string
//   coverUrl: string
//   isSelect?: boolean
// }

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
