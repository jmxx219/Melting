import { Song } from '@/types/song'
import { CoverType } from '@/types/constType'
import ToggleMusicButton from '../Button/ToggleMusicButton'
import SongDropdown from './SongDropdown'

interface SongItemProps extends Song {
  isSelected: boolean
  onSelect: () => void
  onTypeChange?: (value: CoverType) => void
  showTypeSelect?: boolean
}

export default function Item({
  albumCoverImgUrl,
  songTitle,
  artist,
  nickname,
  songType,
  isSelected,
  onSelect,
  onTypeChange,
  showTypeSelect = false,
}: SongItemProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <img
          src={albumCoverImgUrl}
          alt={songTitle}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div>
          <p className="font-semibold">{songTitle}</p>
          <p className="text-xs text-gray">
            {nickname} Original by {artist}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {showTypeSelect && onTypeChange && (
          <SongDropdown
            initialType={songType as CoverType}
            onSelect={onTypeChange} // 선택된 값 변경을 onTypeChange로 전달
          />
        )}
        <ToggleMusicButton isSelected={isSelected} onClick={onSelect} />
      </div>
    </div>
  )
}
