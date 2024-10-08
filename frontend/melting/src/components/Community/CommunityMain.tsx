import { albumApi } from '@/apis/albumApi' // Assume this is the album API
import Album from '@/components/Community/Album'
import SearchBar from '@/components/Music/SearchBar.tsx'
import { AlbumRankingResponseDto } from '@/types/album.ts'
import {
  CommunityConditionType,
  SortType,
  SortVal,
  communityCondition,
  sort,
} from '@/types/constType'
import { useEffect, useState } from 'react'
import SortDropdown from '../Common/SortDropdown'
import { Button } from '../ui/button'
import { Carousel, CarouselContent } from '../ui/carousel'

export default function CommunityMain() {
  const [albums, setAlbums] = useState<AlbumRankingResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState<SortType>(sort.LATEST)
  const [activeConditions, setActiveConditions] = useState<
    CommunityConditionType[]
  >(['ALL'])
  const [page, setPage] = useState<number>(0)

  const conditionKeys = Object.keys(
    communityCondition,
  ) as CommunityConditionType[]

  const toggleCondition = (condition: CommunityConditionType) => {
    setActiveConditions(
      (prevConditions: CommunityConditionType[]): CommunityConditionType[] => {
        if (condition === 'ALL') {
          return ['ALL']
        } else {
          if (prevConditions.includes('ALL')) {
            prevConditions = prevConditions.filter((c) => c !== 'ALL')
          }
          if (prevConditions.includes(condition)) {
            prevConditions = prevConditions.filter((c) => c !== condition)
          } else {
            prevConditions = [...prevConditions, condition]
          }
        }
        if (prevConditions.length === 0) {
          return ['ALL']
        }
        console.log(prevConditions)

        return prevConditions
      },
    )
  }
  const fetchAlbums = async () => {
    try {
      const response = await albumApi.getCommunityAlbums({
        keyword: searchTerm,
        options: activeConditions,
        sort: SortVal[sortOption],
        page: page,
      })
      setAlbums(response.albumInfoList)
    } catch (error) {
      console.error('Failed to fetch albums:', error)
    }
  }

  useEffect(() => {
    fetchAlbums()
  }, [searchTerm, activeConditions, sortOption])

  const handleSearch = () => {
    fetchAlbums()
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 w-full bg-white z-10">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          placeholderText="원하는 앨범을 검색하세요"
        />
        <div className="mt-3 flex items-center space-x-3">
          {/* <div className="flex-1 flex space-x-3 overflow-x-scroll scrollbar-hide"></div> */}
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
          <div className="flex justify-end my-3">
            <SortDropdown
              showText={false}
              initialSort={sortOption}
              onSelect={setSortOption}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 scrollbar-hide">
        <div className="flex flex-wrap justify-center gap-4">
          {albums.map((album) => (
            <Album key={album.albumId} album={album} />
          ))}
        </div>
      </div>
    </div>
  )
}
