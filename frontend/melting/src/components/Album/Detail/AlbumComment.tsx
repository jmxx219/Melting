import {
  differenceInCalendarDays,
  format,
  isThisYear,
  isToday,
  parseISO,
} from 'date-fns'

import { Edit2, Trash } from 'lucide-react'
import { CommentResponseDto } from '@/types/album'
import AlbumUserProfile from './AlbumUserProfile'
import CommentModal from '@/components/Album/comment/CommentModal.tsx'
import ConfirmDialog from '@/components/Common/ConfirmDialog.tsx'
import { albumApi } from '@/apis/albumApi.ts'

type AlbumCommentProps = {
  comment: CommentResponseDto
  albumId: number
  onUpdate: (commentId: number, newContent: string) => void
  onDelete: (commentId: number) => void
}

export default function AlbumComment({
  comment,
  albumId,
  onUpdate,
  onDelete,
}: AlbumCommentProps) {
  const formatDate = (dateString: string) => {
    let date: Date
    try {
      // ISO 8601 형식으로 파싱 시도
      date = parseISO(dateString)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date')
      }
    } catch (error) {
      console.error('Error parsing date:', dateString)
      return 'Invalid date'
    }

    const now = new Date()

    if (isToday(date)) {
      return format(date, 'HH:mm')
    } else if (isThisYear(date)) {
      if (differenceInCalendarDays(now, date) <= 7) {
        return format(date, 'MM.dd')
      } else {
        return format(date, 'MM.dd')
      }
    } else {
      return format(date, 'yy.MM.dd')
    }
  }

  const handleCommentEdit = async (updatedContent: string) => {
    try {
      await albumApi.modifyComment(albumId, comment.commentId, {
        content: updatedContent,
      }) // albumId 사용
      onUpdate(comment.commentId, updatedContent)
    } catch (error) {
      console.error('댓글 수정 실패:', error)
    }
  }

  const handleCommentDelete = async () => {
    try {
      await albumApi.deleteComment(albumId, comment.commentId) // albumId 사용
      onDelete(comment.commentId)
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <AlbumUserProfile
          nickname={comment.writerNickname}
          profileImage={comment.writerProfileImage}
        />
        <div className="text-xs text-gray-500">
          {formatDate(comment.createdAt)}
        </div>
      </div>
      <p className="mt-2 text-sm">{comment.content}</p>
      {comment.isMyComment && (
        <div className="flex justify-end space-x-2 text-gray-500">
          <CommentModal
            onSubmit={handleCommentEdit}
            initialContent={comment.content}
            trigger={<Edit2 className="w-4 h-4" />}
          />
          <ConfirmDialog
            title="댓글 삭제"
            description="정말 삭제하시겠습니까?"
            onConfirm={handleCommentDelete}
            triggerText={<Trash className="w-4 h-4" />}
          />
        </div>
      )}
    </div>
  )
}
