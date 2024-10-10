import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { CommentResponseDto } from '@/types/album'
import AlbumComment from '@/components/Album/Detail/AlbumComment'
import CommentModal from '@/components/Album/comment/CommentModal'
import { albumApi } from '@/apis/albumApi.ts'

type CommentListProps = {
  albumId: number
}

export default function CommentList({ albumId }: CommentListProps) {
  const [comments, setComments] = useState<CommentResponseDto[]>([])
  const [totalComments, setTotalComments] = useState(0)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const { ref, inView } = useInView()

  const handleCommentSubmit = async (comment: string) => {
    try {
      const newComment = await albumApi.writeComment(albumId, {
        content: comment,
      })
      setComments((prevComments) => [newComment, ...prevComments])
      setTotalComments((prevState) => prevState + 1)
    } catch (error) {
      console.error('댓글 작성 실패:', error)
    }
  }

  const handleCommentUpdate = async (commentId: number, newContent: string) => {
    try {
      await albumApi.modifyComment(albumId, commentId, { content: newContent })
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentId === commentId
            ? { ...comment, content: newContent }
            : comment,
        ),
      )
    } catch (error) {
      console.error('댓글 수정 실패:', error)
    }
  }

  const handleCommentDelete = async (commentId: number) => {
    try {
      await albumApi.deleteComment(albumId, commentId)
      setComments((prev) =>
        prev.filter((comment) => comment.commentId !== commentId),
      )
      setTotalComments((prevComments) => prevComments - 1)
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await albumApi.getAllComments(albumId, {
        page,
        size: 10,
      })

      setTotalComments(response.totalElements || 0)
      const commentPage = response.commentPage || []
      // 더 이상 가져올 댓글이 없는 경우 처리
      if (commentPage.length === 0 && page === 0) {
        setHasMore(false)
      } else if (commentPage.length < 10) {
        setHasMore(false)
      }

      // 댓글이 있는 경우 상태 업데이트
      if (commentPage.length > 0) {
        setComments((prevComments) => [...prevComments, ...commentPage]) // commentPage의 데이터를 추가
        setPage((prevPage) => prevPage + 1) // 페이지 증가
      }
    } catch (error) {
      console.error('댓글을 가져오는 중 오류 발생:', error)
    }
  }

  useEffect(() => {
    if (inView && hasMore) {
      fetchComments()
    }
  }, [inView, hasMore])

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-bold text-gray">
          댓글 {totalComments > 999 ? '999+' : totalComments}
        </h2>
        <CommentModal onSubmit={handleCommentSubmit} />
      </div>
      <div className="space-y-0">
        {comments.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="mb-2">댓글이 없습니다. </p>
            <p>댓글을 작성해보세요!</p>
          </div>
        ) : (
          comments.map((comment, index) => (
            <div key={comment.createdAt}>
              <AlbumComment
                comment={comment}
                albumId={albumId}
                onUpdate={handleCommentUpdate}
                onDelete={handleCommentDelete}
              />
              {index !== comments.length - 1 && (
                <hr className="my-2 border-t border-gray-200" />
              )}
            </div>
          ))
        )}
        {hasMore && (
          <div ref={ref} className="h-10 flex justify-center items-center">
            <p>더 많은 댓글을 불러오는 중...</p>
          </div>
        )}
      </div>
    </>
  )
}
