/**
 * base64 문자열을 Blob으로 변환하는 함수
 * @param base64String base64 인코딩된 문자열
 * @param mimeType MIME 타입 (기본값: 'image/jpeg')
 * @returns Blob 객체
 */
export const base64ToBlob = (
  base64String: string,
  mimeType: string = 'image/jpeg',
): Blob => {
  try {
    const byteCharacters = atob(base64String)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
  } catch (error) {
    console.error('Base64 디코딩 오류:', error)
    console.error(
      '받은 base64 문자열 (처음 100자):',
      base64String.substring(0, 100) + '...',
    )
    throw new Error('유효하지 않은 base64 문자열입니다.')
  }
}

/**
 * base64 문자열을 File 객체로 변환하는 함수
 * @param base64String base64 인코딩된 문자열
 * @param fileName 파일 이름
 * @param mimeType MIME 타입 (기본값: 'image/jpeg')
 * @returns File 객체
 */
export const base64ToFile = (
  base64String: string,
  fileName: string,
  mimeType: string = 'image/jpeg',
): File => {
  const blob = base64ToBlob(base64String, mimeType)
  return new File([blob], fileName, { type: mimeType })
}

/**
 * base64 문자열을 사용해 Blob URL을 생성하는 함수
 * @param base64String base64 인코딩된 문자열
 * @param mimeType MIME 타입 (기본값: 'image/jpeg')
 * @returns Blob URL
 */
export const base64ToUrl = (
  base64String: string,
  mimeType: string = 'image/jpeg',
): string => {
  const blob = base64ToBlob(base64String, mimeType)
  return URL.createObjectURL(blob)
}
