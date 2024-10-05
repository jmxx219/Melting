/**
 * base64 문자열을 Blob으로 변환하는 함수
 * @param base64String base64 인코딩된 문자열
 * @returns Blob 객체
 */
export const base64ToBlob = (base64String: string): Blob => {
  const [mimeTypeInfo, base64Data] = base64String.split(',')
  const matchResult = mimeTypeInfo.match(/data:([^;]+);base64/)

  // match 결과가 null일 경우 예외 처리
  if (!matchResult) {
    throw new Error('Invalid base64 string format')
  }

  const mimeType = matchResult[1]
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)
    .fill(0)
    .map((_, i) => byteCharacters.charCodeAt(i))
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}

/**
 * base64 문자열을 File 객체로 변환하는 함수
 * @param base64String base64 인코딩된 문자열
 * @param fileName 파일 이름
 * @returns File 객체
 */
export const base64ToFile = (base64String: string, fileName: string): File => {
  const blob = base64ToBlob(base64String)
  const mimeType = blob.type
  return new File([blob], fileName, { type: mimeType })
}

/**
 * base64 문자열을 사용해 Blob URL을 생성하는 함수
 * @param base64String base64 인코딩된 문자열
 * @returns Blob URL
 */
export const base64ToUrl = (base64String: string): string => {
  const blob = base64ToBlob(base64String)
  return URL.createObjectURL(blob)
}
