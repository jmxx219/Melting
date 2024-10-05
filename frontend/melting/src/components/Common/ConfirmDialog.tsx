import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

interface ConfirmDialogProps {
  title: string
  description: string
  onConfirm: () => void
  triggerText: React.ReactNode
  triggerClassName?: string
  disabled?: boolean
}

export default function ConfirmDialog({
  title,
  description,
  onConfirm,
  triggerText,
  triggerClassName = '',
  disabled = false,
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className={`focus:outline-none ${triggerClassName} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
          }}
          disabled={disabled} // 버튼 비활성화
        >
          {triggerText}
        </button>
      </AlertDialogTrigger>
      {!disabled && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.stopPropagation()
                onConfirm()
              }}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  )
}
