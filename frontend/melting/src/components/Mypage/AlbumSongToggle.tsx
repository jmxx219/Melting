import { useState } from 'react'
import AlbumList from '@/components/MyPage/AlbumList' // 앨범 리스트 컴포넌트
import SongList from '@/components/MyPage/SongList' // 곡 리스트 컴포넌트
import SortDropdown from '@/components/MyPage/SortDropdown'

export default function AlbumSongToggle() {
  const [selectedTab, setSelectedTab] = useState<'album' | 'song'>('album')
  const [sortOption, setSortOption] = useState<'date' | 'popularity'>('date')

  return (
    <div className="w-full">
      {/* 상단: 앨범/곡 토글 및 정렬 기준 선택 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {/* 앨범 버튼 */}
          <button
            onClick={() => setSelectedTab('album')}
            className={`px-4 py-2 rounded-full ${selectedTab === 'album' ? 'bg-primary-400 text-white' : 'bg-gray-200 text-black'}`}
          >
            앨범
          </button>

          {/* 곡 버튼 */}
          <button
            onClick={() => setSelectedTab('song')}
            className={`px-4 py-2 rounded-full ${selectedTab === 'song' ? 'bg-primary-400 text-white' : 'bg-gray-200 text-black'}`}
          >
            곡
          </button>
        </div>

        <SortDropdown initialSort={sortOption} onSelect={setSortOption} />
      </div>

      {/* 결과 리스트: 선택된 탭에 따라 다르게 렌더링 */}
      <div>
        {selectedTab === 'album' ? (
          <AlbumList sortOption={sortOption} />
        ) : (
          <SongList sortOption={sortOption} />
        )}
      </div>
    </div>
  )
}
