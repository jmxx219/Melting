import { Song } from '@/types/song'
import { CoverType } from '@/types/constType'
import ToggleMusicButton from '../Button/ToggleMusicButton'
import SongDropdown from './SongDropdown'
import { useUserInfo } from '@/hooks/useUserInfo.ts'

interface SongItemProps extends Song {
  isSelected: boolean
  onSelect: () => void
  onTypeChange?: (value: CoverType) => void
  showTypeSelect?: boolean
  meltingSongId: number | null
  aiCoverSongId: number | null
}

export default function Item({
  albumCoverImageUrl,
  songTitle,
  artist,
  songType,
  isSelected,
  onSelect,
  onTypeChange,
  showTypeSelect = false,
  meltingSongId,
  aiCoverSongId,
}: SongItemProps) {
  const { data: userInfo } = useUserInfo()
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <img
          src={albumCoverImageUrl}
          alt={songTitle}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div>
          <p className="font-semibold">{songTitle}</p>
          <p className="text-xs text-gray">
            {userInfo?.nickname ?? 'YOU'} Original by {artist}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {showTypeSelect && onTypeChange && (
          <SongDropdown
            initialType={songType as CoverType}
            onSelect={onTypeChange}
            disabledOptions={{
              melting: meltingSongId === null,
              ai: aiCoverSongId === null,
            }}
          />
        )}
        <ToggleMusicButton isSelected={isSelected} onClick={onSelect} />
      </div>
    </div>
  )
}
