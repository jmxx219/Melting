interface AlbumListProps {
  sortOption: 'date' | 'popularity'
  viewType: 'my' | 'liked'
}

export default function AlbumList({ sortOption, viewType }: AlbumListProps) {
  return (
    <div>
      {viewType === 'my' ? '내가 등록한 ' : '좋아요한 '}
      앨범 리스트 ({sortOption === 'date' ? '최신순' : '인기순'})
      {/* 앨범 리스트를 여기에 렌더링 */}
    </div>
  )
}
