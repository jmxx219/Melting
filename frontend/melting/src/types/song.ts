export interface Song {
  id: number
  title: string
  artist: string
  coverUrl: string
  isSelect?: boolean
}

export interface SongListProps {
  songs: Song[]
  showNumbers: boolean
}
