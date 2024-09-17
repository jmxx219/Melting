import { Song } from '@/types/music'
import ToggleMusicButton from '../Button/ToggleMusicButton'
import SongDropdown from './SongDropdown'

interface SongItemProps extends Song {
  isSelected: boolean
  onSelect: () => void
  onTypeChange?: (value: 'melting' | 'ai') => void
  showTypeSelect?: boolean
}

export default function Item({
  album_cover_img_url,
  song_title,
  artist,
  nickname,
  song_type,
  isSelected,
  onSelect,
  onTypeChange,
  showTypeSelect = false,
}: SongItemProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <img
          src={album_cover_img_url}
          alt={song_title}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div>
          <p className="font-semibold">{song_title}</p>
          <p className="text-xs text-gray">
            {nickname} Original by {artist}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {showTypeSelect && onTypeChange && (
          <SongDropdown
            initialType={song_type}
            onSelect={onTypeChange} // 선택된 값 변경을 onTypeChange로 전달
          />
        )}
        <ToggleMusicButton isSelected={isSelected} onClick={onSelect} />
      </div>
    </div>
  )
}
