import { useState } from 'react'
import MyAlbumList from '@/components/MyPage/MyAlbumList'
import MySongList from '@/components/MyPage/MySongList'
import LikedSongList from '@/components/MyPage/LikedSongList'
import SortDropdown from '@/components/Common/SortDropdown'

interface AlbumSongToggleProps {
  viewType: 'my' | 'liked'
}

export default function AlbumSongToggle({ viewType }: AlbumSongToggleProps) {
  const [selectedTab, setSelectedTab] = useState<'album' | 'song'>('album')
  const [sortOption, setSortOption] = useState<'LATEST' | 'POPULAR'>('LATEST')

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setSelectedTab('album')}
            className={`px-4 py-2 rounded-full ${selectedTab === 'album' ? 'bg-primary-400 text-white' : 'bg-gray-200 text-black'}`}
          >
            앨범
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('song')}
            className={`px-4 py-2 rounded-full ${selectedTab === 'song' ? 'bg-primary-400 text-white' : 'bg-gray-200 text-black'}`}
          >
            곡
          </button>
        </div>

        <SortDropdown initialSort={sortOption} onSelect={setSortOption} />
      </div>

      <div>
        {selectedTab === 'album' ? (
          <MyAlbumList sortOption={sortOption} viewType={viewType} />
        ) : viewType === 'my' ? (
          <MySongList sortOption={sortOption} />
        ) : (
          <LikedSongList sortOption={sortOption} />
        )}
      </div>
    </div>
  )
}
