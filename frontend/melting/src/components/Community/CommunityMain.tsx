import { albumApi } from '@/apis/albumApi'
import Album from '@/components/Community/Album'
import SearchBar from '@/components/Music/SearchBar.tsx'
import { AlbumRankingResponseDto } from '@/types/album.ts'
import { CommunityConditionType, communityCondition } from '@/types/constType'
import { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from '../Common/InfinityScroll'
import { Button } from '../ui/button'
import { Carousel, CarouselContent } from '../ui/carousel'

export default function CommunityMain() {
  const [albums, setAlbums] = useState<AlbumRankingResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeConditions, setActiveConditions] = useState<
    CommunityConditionType[]
  >(['ALL'])
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const conditionKeys = Object.keys(
    communityCondition,
  ) as CommunityConditionType[]

  // Toggling conditions for filtering and resetting the page
  const toggleCondition = (condition: CommunityConditionType) => {
    setActiveConditions((prevConditions) => {
      let updatedConditions = prevConditions.includes('ALL')
        ? prevConditions.filter((c) => c !== 'ALL')
        : [...prevConditions]

      if (condition === 'ALL') {
        updatedConditions = ['ALL']
      } else if (updatedConditions.includes(condition)) {
        updatedConditions = updatedConditions.filter((c) => c !== condition)
      } else {
        updatedConditions = [...updatedConditions, condition]
      }

      if (updatedConditions.length === 0) {
        updatedConditions = ['ALL']
      }

      setPage(0) // Reset page whenever conditions change
      setHasMore(true) // Allow infinite scroll to restart
      return updatedConditions
    })
  }

  // Fetching albums with pagination
  const fetchAlbums = async (reset = false) => {
    try {
      const response = await albumApi.getCommunityAlbums({
        keyword: searchTerm,
        options: activeConditions,
        page: reset ? 0 : page, // Fetch from page 0 if resetting
      })
      const newItems = response.albumInfoList || []

      if (reset) {
        setAlbums(newItems) // Replace albums on reset
      } else {
        setAlbums((prev) => [...prev, ...newItems]) // Append albums otherwise
      }

      setHasMore(!response.isLast) // Determine if there are more items
      setPage((prev) => (reset ? 1 : prev + 1)) // Increment or reset the page
    } catch (error) {
      console.error('Failed to fetch albums:', error)
      setHasMore(false)
    }
    setLoading(false) // Reset loading state
  }

  // Trigger album fetch on search or condition change
  useEffect(() => {
    setLoading(true)
    fetchAlbums(true) // Reset and fetch on search term or filter change
  }, [searchTerm, activeConditions])

  // Load more items when scrolled to the bottom
  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    await fetchAlbums() // Continue fetching the next page
  }, [loading, hasMore, page, searchTerm, activeConditions])

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 w-full bg-white z-10">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => setPage(0)} // Reset page on search
          placeholderText="원하는 앨범을 검색하세요"
        />
        <div className="my-3 items-center space-x-3">
          <Carousel className="w-full overflow-x-scroll scrollbar-hide space-x-3">
            <CarouselContent className="w-full p-0 m-0 space-x-3">
              {conditionKeys.map((condition) => (
                <Button
                  type="button"
                  key={condition}
                  variant={
                    activeConditions.includes(condition) ? 'default' : 'outline'
                  }
                  className={`rounded-full px-4 py-2 ${activeConditions.includes(condition) ? 'bg-primary-400 text-white' : 'bg-white text-primary-400'}`}
                  onClick={() => toggleCondition(condition)}
                >
                  {communityCondition[condition]}
                </Button>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <InfiniteScroll
        loadMore={loadMoreItems}
        hasMore={hasMore}
        loading={loading}
      >
        <div className="flex-1 overflow-auto p-4 scrollbar-hide">
          <div className="flex flex-wrap justify-center gap-4">
            {albums.map((album) => (
              <Album key={album.albumId} album={album} />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  )
}
