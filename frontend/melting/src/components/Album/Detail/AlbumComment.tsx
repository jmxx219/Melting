import { CommentResponseDto } from '@/types/album'
import {
  differenceInCalendarDays,
  format,
  isThisYear,
  isToday,
  parseISO,
} from 'date-fns'
import AlbumUserProfile from './AlbumUserProfile'

type AlbumCommentProps = {
  comment: CommentResponseDto
}

export default function AlbumComment({ comment }: AlbumCommentProps) {
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
      <p className="text-sm mt-1">{comment.content}</p>
    </div>
  )
}
