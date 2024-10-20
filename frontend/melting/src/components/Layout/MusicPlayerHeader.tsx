import { X } from 'lucide-react'
import { Button } from '../ui/button'

type MusicPlayerHeaderProps = {
  songTitle: string
  artist: string
  onClose: () => void
}

export default function MusicPlayerHeader({
  songTitle,
  artist,
  onClose,
}: MusicPlayerHeaderProps) {
  return (
    <div className="flex">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{songTitle}</h1>
        <h2 className="text-base text-[#A5A5A5]">{artist}</h2>
      </div>
      <div>
        <Button size="icon" type="button" onClick={onClose} variant={'ghost'}>
          <X className="font-bold"></X>
        </Button>
      </div>
    </div>
  )
}
