interface SongListProps {
  sortOption: 'date' | 'popularity'
  viewType: 'my' | 'liked'
}

export default function SongList({ sortOption, viewType }: SongListProps) {
  return (
    <div>
      <h2>
        {viewType === 'my' ? '내가 등록한 ' : '좋아요한 '}곡 리스트 (
        {sortOption === 'date' ? '최신순' : '인기순'})
      </h2>
      {/* 곡 리스트를 여기에 렌더링 */}
    </div>
  )
}
