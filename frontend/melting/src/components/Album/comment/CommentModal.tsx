import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MessageCirclePlus } from 'lucide-react' // 기본 아이콘 import

interface CommentModalProps {
  onSubmit: (comment: string) => void
  trigger?: React.ReactNode
  initialContent?: string // 초기 댓글 내용
  isEditing?: boolean
}

export default function CommentModal({
  onSubmit,
  trigger,
  initialContent = '', // 초기 댓글 내용의 기본값 설정
  isEditing = false,
}: CommentModalProps) {
  const [comment, setComment] = useState(initialContent) // 초기값으로 설정
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setComment(initialContent) // initialContent가 변경될 때마다 comment 상태 업데이트
  }, [initialContent])

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment)
      setComment('')
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <MessageCirclePlus className="h-5 w-5 cursor-pointer" />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px] w-[350px] h-80 flex flex-col rounded-2xl p-4">
        <div className="relative flex-grow mt-6">
          <Textarea
            className="resize-none border border-primary-400 rounded p-2 h-full w-full overflow-y-auto"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
            placeholder={`글 작성 시 주의사항 \n※ 욕설, 비방 음란성, 도배글 등 다른 사용자에게 불쾌감 주는 글은 사전고지 없이 삭제될 수 있습니다.`}
          />
          <span
            className={`absolute right-2 bottom-2 text-xs ${
              comment.length <= 500 && comment.length > 0
                ? 'text-primary-400'
                : 'text-gray'
            } ${comment.length > 500 ? 'text-status-warning' : ''} `}
          >
            {comment.length}/500
          </span>
        </div>
        <div className="flex justify-center items-center">
          <DialogClose asChild>
            <Button className="rounded-2xl w-full" onClick={handleSubmit}>
              {isEditing ? '수정' : '작성'}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
