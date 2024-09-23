import { Button } from '@/components/ui/button'
import MusicNote from '@/components/icon/MusicNote'

interface ToggleMusicButtonProps {
  isSelected: boolean
  onClick: () => void
  className?: string
}

export default function ToggleMusicButton({
  isSelected,
  onClick,
  className = '',
}: ToggleMusicButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={`p-1 ${className}`}
    >
      <MusicNote
        width={28}
        height={28}
        fill={isSelected ? '#ffaf25' : '#d1d5db'}
      />
    </Button>
  )
}
