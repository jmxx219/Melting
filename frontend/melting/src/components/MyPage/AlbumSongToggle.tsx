import { useState } from 'react'
import MyAlbumList from '@/components/MyPage/MyAlbumList'
import MySongList from '@/components/MyPage/MySongList'
import LikedSongList from '@/components/MyPage/LikedSongList'
import SortDropdown from '@/components/Common/SortDropdown'
import { SortType, sort, ViewType, view, TabType, tab } from '@/types/constType'

interface AlbumSongToggleProps {
  viewType: ViewType
  tabType: TabType
}

export default function AlbumSongToggle({
  viewType,
  tabType,
}: AlbumSongToggleProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>(tabType)
  const [sortOption, setSortOption] = useState<SortType>(sort.LATEST)

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setSelectedTab(tab.ALBUM)}
            className={`px-4 py-2 rounded-full ${selectedTab === tab.ALBUM ? 'bg-primary-400 text-white' : 'bg-gray-200 text-black'}`}
          >
            앨범
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab(tab.SONG)}
            className={`px-4 py-2 rounded-full ${selectedTab === tab.SONG ? 'bg-primary-400 text-white' : 'bg-gray-200 text-black'}`}
          >
            곡
          </button>
        </div>

        {(viewType !== view.MY || selectedTab !== tab.SONG) && (
          <SortDropdown initialSort={sortOption} onSelect={setSortOption} />
        )}
      </div>

      <div>
        {selectedTab === tab.ALBUM ? (
          <MyAlbumList sortOption={sortOption} viewType={viewType} />
        ) : viewType === view.MY ? (
          <MySongList sortOption={sortOption} />
        ) : (
          <LikedSongList sortOption={sortOption} />
        )}
      </div>
    </div>
  )
}
