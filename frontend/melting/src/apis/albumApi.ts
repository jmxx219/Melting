export async function searchHashtags(query: string): Promise<string[]> {
  // 실제 API 호출 로직을 여기에 구현합니다.
  // 예시 코드:
  // const response = await fetch(`/api/hashtags?query=${encodeURIComponent(query)}`);
  // const data = await response.json();
  // return data.hashtags;
  return ['사진', '사랑해', '사랑합니다', '사진스타그램'].filter((tag) =>
    tag.includes(query),
  )
}
