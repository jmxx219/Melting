import { LoaderCircle } from 'lucide-react'

type LodingModalProps = {
  isOpen: boolean
  content: string
}

export default function LoadingModal({ isOpen, content }: LodingModalProps) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="flex flex-col items-center">
        <LoaderCircle className="animate-spin w-16 h-16 text-primary-400" />
        <p className="text-white mt-2">{content}</p>
      </div>
    </div>
  )
}
