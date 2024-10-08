import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { CommentResponseDto } from '@/types/album'
import AlbumComment from './AlbumComment'
import { albumApi } from '@/apis/albumApi.ts'

type AlbumCommentListProps = {
  comments: CommentResponseDto[]
  commentCnt: number
  albumId: number
}

export default function AlbumCommentList({
  comments,
  commentCnt,
  albumId,
}: AlbumCommentListProps) {
  const navigate = useNavigate()
  const [commentList, setCommentList] = useState<CommentResponseDto[]>(comments)
  const [commentCount, setCommentCount] = useState(commentCnt)
  const totalShowHandle = () => {
    navigate('/album/comment', { state: { albumId: albumId } })
  }
  // 댓글 수정 핸들러
  const handleCommentUpdate = (commentId: number, newContent: string) => {
    setCommentList((prevComments) =>
      prevComments.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, content: newContent }
          : comment,
      ),
    )
  }

  // 댓글 삭제 핸들러
  const handleCommentDelete = async (commentId: number) => {
    try {
      await albumApi.deleteComment(albumId, commentId)
      const response = await albumApi.getAllComments(albumId, {
        page: 0,
        size: 5,
      }) // 삭제 후 다시 댓글 5개 조회
      setCommentList(response.commentPage || [])
      setCommentCount((prevCnt) => prevCnt - 1)
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
    }
  }

  return (
    <div id="album-comment" className="mt-10">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">
          댓글 {commentCount > 1000 ? '999+' : commentCount}
        </div>

        <Button
          type="button"
          variant={'ghost'}
          className="p-0"
          onClick={totalShowHandle}
        >
          전체보기
        </Button>
      </div>
      <div className="mt-2">
        {commentList.map((comment, index) => (
          <React.Fragment key={`${comment.createdAt} - ${comment.commentId}`}>
            <AlbumComment
              comment={comment}
              albumId={albumId}
              onUpdate={handleCommentUpdate}
              onDelete={handleCommentDelete}
            />
            {index < comments.length - 1 && (
              <hr className="my-2 border-t border-gray-200" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
