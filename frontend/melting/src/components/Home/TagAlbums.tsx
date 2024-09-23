import { useEffect, useState } from 'react'

import { BestAlbum } from '@/types/album'
import Album from '../Community/Album'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

const albums: BestAlbum[] = [
  {
    albumId: 1,
    albumName: '스테디 첫 번째 앨범',
    nickname: '아티스트1',
    albumCoverImage: '/images/mockup/album0.png',
  },
  {
    albumId: 2,
    albumName: '스테디 두 번째 앨범',
    nickname: '아티스트2',
    albumCoverImage: '/images/mockup/album1.png',
  },
  {
    albumId: 3,
    albumName: '스테디 세 번째 앨범',
    nickname: '아티스트3',
    albumCoverImage: '/images/mockup/album2.png',
  },
]

export default function TagAlbum() {
  const [tags, setTags] = useState(['#발라드', '#댄스'])
  const [tagAlbums, isTagAlbums] = useState<BestAlbum[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddTag = (tag) => {
    if (tags.length < 5) setTags([...tags, tag])
  }

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <>
      <div className="text-2xl font-bold mb-2">태그별 앨범</div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-0">
          {tagAlbums.map((album) => (
            <Album key={album.albumId} album={album} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}
