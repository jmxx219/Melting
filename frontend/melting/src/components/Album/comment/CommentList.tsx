import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { CommentResponseDto } from '@/types/album'
import AlbumComment from '@/components/Album/Detail/AlbumComment'
import CommentModal from '@/components/Album/comment/CommentModal'
import { albumApi } from '@/apis/albumApi'

type CommentListProps = {
  albumId: number
}

export default function CommentList({ albumId }: CommentListProps) {
  const [comments, setComments] = useState<CommentResponseDto[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const { ref, inView } = useInView()

  const handleCommentSubmit = (comment: string) => {
    console.log('Submitted comment:', comment)
  }

  const fetchComments = async () => {
    try {
      const response = await albumApi.getAllComments(albumId, {
        page,
        size: 10,
      })
      if (response.length === 0 && page === 0) {
        // 처음 페이지에서 댓글이 없는 경우
        setHasMore(false)
      } else if (response.length < 10) {
        // 마지막 페이지에 도달하여 더 이상 가져올 댓글이 없는 경우
        setHasMore(false)
      }
      if (response.length > 0) {
        setComments((prevComments) => [...prevComments, ...response])
        setPage((prevPage) => prevPage + 1)
      }
    } catch (error) {
      console.error('댓글을 가져오는 중 오류 발생:', error)
    }
  }

  useEffect(() => {
    if (inView && hasMore) {
      fetchComments()
    }
  }, [inView])

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-bold text-gray">
          댓글 {comments.length > 999 ? '999+' : comments.length}
        </h2>
        <CommentModal onSubmit={handleCommentSubmit} />
      </div>
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">댓글이 없습니다. 댓글을 작성해보세요!</p>
        ) : (
          comments.map((comment) => (
            <AlbumComment key={comment.commentId} comment={comment} />
          ))
        )}
        {hasMore && (
          <div ref={ref} className="h-10 flex justify-center items-center">
            <p>더 많은 댓글을 불러오는 중...</p>
          </div>
        )}
      </div>
    </div>
  )
}
