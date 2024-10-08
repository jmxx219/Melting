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
