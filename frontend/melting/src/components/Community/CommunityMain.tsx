// import { useEffect, useRef, useState } from 'react'

// import { AlbumMainResponseDto, BestAlbum } from '@/types/album.ts'
// import { BestAlbum } from '@/types/album.ts'
// import { albumApi } from '@/apis/albumApi.ts'
// import SearchBar from '@/components/Music/SearchBar.tsx'
// import SortDropdown from '@/components/Common/SortDropdown.tsx'
// import Album from '@/components/Community/Album'

export default function CommunityMain() {
  // const [albums, setAlbums] = useState<BestAlbum[]>([]) // TODO: 나중에 사용할 변수
  // const [searchTerm, setSearchTerm] = useState('')
  // const [sortOption, setSortOption] = useState<'LATEST' | 'POPULAR'>('LATEST')
  // const [page, setPage] = useState(1)
  // const [hasMore, setHasMore] = useState(true) // TODO: 나중에 사용할 변수
  // const loaderRef = useRef<HTMLDivElement | null>(null)
  //
  // useEffect(() => {
  //   const loadAlbums = async () => {
  //     try {
  //       // const newAlbums = await albumApi.getAlbumsInCommunityMainPage({
  //       //   sort: sortOption,
  //       // })
  //       // console.log(newAlbums)
  //       // setAlbums((prev) => [...prev, ...newAlbums])
  //       // if (newAlbums.length === 0) setHasMore(false)
  //       console.log('load albums')
  //     } catch (error) {
  //       console.error('Error fetching albums:', error)
  //     }
  //   }
  //
  //   loadAlbums()
  // }, [page, sortOption])
  //
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         setPage((prev) => prev + 1)
  //       }
  //     },
  //     { threshold: 1 },
  //   )
  //
  //   if (loaderRef.current) {
  //     observer.observe(loaderRef.current)
  //   }
  //
  //   return () => {
  //     if (loaderRef.current) {
  //       observer.unobserve(loaderRef.current)
  //     }
  //   }
  // }, [hasMore])
  //
  // const handleSearch = () => {
  //   // 검색 결과 페이지로 이동하거나 검색 결과를 필터링하는 로직 구현
  //   console.log('Searching for:', searchTerm)
  // }

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 w-full bg-white z-10">
        {/*<SearchBar*/}
        {/*  searchTerm={searchTerm}*/}
        {/*  setSearchTerm={setSearchTerm}*/}
        {/*  onSearch={handleSearch}*/}
        {/*  placeholderText="원하는 앨범을 검색하세요"*/}
        {/*/>*/}
        <div className="flex justify-end my-3">
          {/*<SortDropdown initialSort={sortOption} onSelect={setSortOption} />*/}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {/*{albums.map((album) => (*/}
          {/*  <Album key={album.albumId} album={album} />*/}
          {/*))}*/}
        </div>
        {/*{hasMore && <div ref={loaderRef} className="loader h-10"></div>}*/}
      </div>
    </div>
  )
}
