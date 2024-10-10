import { LoaderCircle } from 'lucide-react'

type LodingModalProps = {
  isOpen: boolean
}

export default function LoadingModal({ isOpen }: LodingModalProps) {
  return (
    isOpen && (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <LoaderCircle className="animate-spin w-12 h-12 text-primary-400" />
      </div>
    )
  )
}
