import { Edit2, Trash } from 'lucide-react'
import { CommentResponseDto } from '@/types/album'
import AlbumUserProfile from './AlbumUserProfile'
import CommentModal from '@/components/Album/comment/CommentModal.tsx'
import ConfirmDialog from '@/components/Common/ConfirmDialog.tsx'
import { albumApi } from '@/apis/albumApi.ts'
import { convertDateComment } from '@/utils/dateUtil.ts'

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
      await albumApi.deleteComment(albumId, comment.commentId)
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
          {convertDateComment(comment.createdAt)}
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
