import { useLoading } from '@/contexts/LoadingContext.tsx'
import { Loader } from 'lucide-react' // lucide-react 라이브러리의 spin 아이콘 사용

export default function LoadingIndicator() {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary-100 z-50">
      <div className="flex flex-col items-center">
        <p className="text-primary-400 mb-4">로딩 중입니다...</p>
        <Loader className="text-primary-400 animate-spin w-12 h-12" />
      </div>
    </div>
  )
}
