import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { CommentResponseDto } from '@/types/album'
import AlbumComment from '@/components/Album/Detail/AlbumComment'
import CommentModal from '@/components/Album/comment/CommentModal'
import { albumApi } from '@/apis/albumApi'

type CommentListProps = {
  albumId: number
}

// 목업 데이터 정의
const mockComments: CommentResponseDto[] = Array.from(
  { length: 50 },
  (_, index) => ({
    commentId: index + 1,
    writerProfileImage: 'https://via.placeholder.com/150',
    writerNickname: `User ${index + 1}`,
    content: `This is comment number ${index + 1}`,
    isMyComment: Math.random() < 0.5, // 랜덤하게 본인의 댓글 여부 결정
    createdAt: new Date().toISOString(),
  }),
)

export default function CommentList({ albumId }: CommentListProps) {
  const [comments, setComments] = useState<CommentResponseDto[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const { ref, inView } = useInView()

  // const handleCommentSubmit = async (comment: string) => {
  //   try {
  //     const newComment = await albumApi.createComment(albumId, { content: comment })
  //     setComments((prevComments) => [newComment, ...prevComments])
  //   } catch (error) {
  //     console.error('댓글 작성 실패:', error)
  //   }
  // }

  const handleCommentSubmit = (comment: string) => {
    console.log('Submitted comment:', comment)
  }

  const handleCommentUpdate = (commentId: number, newContent: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, content: newContent }
          : comment,
      ),
    )
  }

  const handleCommentDelete = async (commentId: number) => {
    // Implement your API request for deleting the comment
    console.log('Deleting comment with ID:', commentId)
    setComments((prev) =>
      prev.filter((comment) => comment.commentId !== commentId),
    )
  }

  // const fetchComments = async () => {
  //   try {
  //     const response = await albumApi.getAllComments(albumId, {
  //       page,
  //       size: 10,
  //     })
  //     if (response.length === 0 && page === 0) {
  //       // 처음 페이지에서 댓글이 없는 경우
  //       setHasMore(false)
  //     } else if (response.length < 10) {
  //       // 마지막 페이지에 도달하여 더 이상 가져올 댓글이 없는 경우
  //       setHasMore(false)
  //     }
  //     if (response.length > 0) {
  //       setComments((prevComments) => [...prevComments, ...response])
  //       setPage((prevPage) => prevPage + 1)
  //     }
  //   } catch (error) {
  //     console.error('댓글을 가져오는 중 오류 발생:', error)
  //   }
  // }

  const fetchComments = () => {
    const newComments = mockComments.slice(page * 10, (page + 1) * 10)
    if (newComments.length === 0) {
      setHasMore(false) // 더 이상 가져올 댓글이 없으면
    } else {
      setComments((prevComments) => [...prevComments, ...newComments])
      setPage((prevPage) => prevPage + 1)
    }
  }

  useEffect(() => {
    if (inView && hasMore) {
      fetchComments()
    }
  }, [inView])

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-bold text-gray">
          댓글 {comments.length > 999 ? '999+' : comments.length}
        </h2>
        <CommentModal onSubmit={handleCommentSubmit} />
      </div>
      <div className="space-y-0">
        {comments.length === 0 ? (
          <p className="text-gray-500">댓글이 없습니다. 댓글을 작성해보세요!</p>
        ) : (
          comments.map((comment, index) => (
            <div key={comment.commentId}>
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
