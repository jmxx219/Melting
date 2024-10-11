import {
  differenceInCalendarDays,
  format,
  isThisYear,
  isToday,
  parseISO,
} from 'date-fns'

export function convertIsoToDotDate(isoDateString: string): string {
  const date = new Date(isoDateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}

export function convertDateToWord(date: Date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

export function convertDateStringToWord(isoDateString: string) {
  const date = new Date(isoDateString)
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

export function convertDateComment(dateString: string) {
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
