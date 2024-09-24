// 숫자를 K, M 형식으로 변환하는 유틸리티 함수
export const formatLikeCount = (count: number): string => {
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  } else if (count >= 1_000) {
    return (
      (count / 1_000).toFixed(count < 10_000 ? 1 : 0).replace(/\.0$/, '') + 'K'
    )
  } else {
    return count.toLocaleString()
  }
}
