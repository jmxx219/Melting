// URL을 File 객체로 변환하는 함수
export const urlToFile = async (
  url: string,
  fileName: string,
  mimeType: string,
) => {
  const response = await fetch(url)
  const blob = await response.blob()
  return new File([blob], fileName, { type: mimeType })
}
