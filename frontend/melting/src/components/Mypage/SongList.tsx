export default function SongList({
  sortOption,
}: {
  sortOption: 'date' | 'popularity'
}) {
  return (
    <div>
      <h2>곡 리스트 ({sortOption === 'date' ? '최신순' : '인기순'})</h2>
      {/* 곡 리스트를 여기에 렌더링 */}
    </div>
  )
}
