import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

interface SubmitButtonProps {
  conditions: boolean[]
  onClick: () => void
  text: string
  className?: string
}

export default function SubmitButton({
  conditions,
  onClick,
  text,
  className,
}: SubmitButtonProps) {
  const isEnabled = conditions.every((condition) => condition)

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={!isEnabled}
      className={cn(
        'w-full h-14 rounded-full',
        isEnabled
          ? 'bg-primary-400 text-white hover:bg-primary-400/90'
          : 'bg-gray text-white cursor-not-allowed',
        className,
      )}
    >
      {text}
    </Button>
  )
}
