import ToggleMusicButton from '../Button/ToggleMusicButton'
import SongDropdown from './SongDropdown'

interface SongItemProps {
  song_id: number
  album_cover_img_url: string
  song_title: string
  nickname: string
  artist: string
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
            onSelect={onTypeChange} // 선택된 값 변경을 onTypeChange로 전달
          />
        )}
        <ToggleMusicButton isSelected={isSelected} onClick={onSelect} />
      </div>
    </div>
  )
}
