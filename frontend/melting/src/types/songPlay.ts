import { Song } from './song'

export interface SongPlay extends Song {
  like: number
  lyrics: string
  audioSrc: string
}
