import { ReactNode, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface InfiniteScrollProps {
  loadMore: () => void
  hasMore: boolean
  loading: boolean
  children: ReactNode
}

export default function InfiniteScroll({
  loadMore,
  hasMore,
  loading,
  children,
}: InfiniteScrollProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore()
    }
  }, [inView, hasMore, loading, loadMore])

  return (
    <div>
      {children}
      {loading && <p className="text-center">로딩 중...</p>}
      {hasMore && !loading && (
        <div ref={ref} className="flex justify-center my-8">
          {/* 스크롤 트리거 아이콘이나 텍스트 */}
          <p>더 불러오는 중...</p>
        </div>
      )}
    </div>
  )
}
