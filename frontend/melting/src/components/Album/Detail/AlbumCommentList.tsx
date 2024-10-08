import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { CommentResponseDto } from '@/types/album'
import AlbumComment from './AlbumComment'

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
  const totalShowHandle = () => {
    navigate('/album/comment', { state: { albumId: albumId } })
  }
  return (
    <div id="album-comment" className="mt-10">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">
          댓글 {commentCnt > 1000 ? '999+' : comments.length}
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
        {comments.map((comment, index) => (
          <React.Fragment key={index}>
            <AlbumComment comment={comment} />
            {index < comments.length - 1 && (
              <hr className="my-2 border-t border-gray-200" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
