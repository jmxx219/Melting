import { useEffect, useState } from 'react'

import { AlbumRankingResponseDto } from '@/types/album'
import Album from '../Community/Album'
import { Plus } from 'lucide-react'

import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import HashtagButton from '../Button/HashtagButton'
import HashtagSelector from '@/components/Album/HashtagSelector'
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
// import AlertModal from '@/components/common/AlertModal.tsx'

const mockup: AlbumRankingResponseDto[] = [
  {
    albumId: 1,
    albumName: '태그 첫 번째 앨범',
    creatorNickname: '아티스트1',
    albumCoverImageUrl: '/images/mockup/album0.png',
  },
  {
    albumId: 2,
    albumName: '태그 두 번째 앨범',
    creatorNickname: '아티스트2',
    albumCoverImageUrl: '/images/mockup/album1.png',
  },
  {
    albumId: 3,
    albumName: '태그 세 번째 앨범',
    creatorNickname: '아티스트3',
    albumCoverImageUrl: '/images/mockup/album2.png',
  },
]

export default function TagAlbum() {
  const [tags, setTags] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [albums, setAlbums] = useState<AlbumRankingResponseDto[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [showWarning, setShowWarning] = useState(false)
  const [tagToDelete, setTagToDelete] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedTag) {
      // 태그가 선택되면 API를 호출하여 해당 앨범 목록을 가져옴 (isLoading)
      // fetchAlbumsByTag(selectedTag).then(setAlbums);
      setAlbums(mockup)
      setIsLoading(false)
    }
  }, [selectedTag])

  const addTag = () => {
    if (selectedHashtags.length > 0) {
      const tag = selectedHashtags[0] // 선택된 첫 번째 해시태그를 사용
      if (tags.length < 5 && !tags.includes(tag)) {
        setTags([...tags, tag])
        setSelectedHashtags([]) // 선택된 해시태그 초기화
        setIsDialogOpen(false)
      }
    }
  }

  const removeTag = () => {
    if (tagToDelete) {
      setTags(tags.filter((tag) => tag !== tagToDelete))
      if (selectedTag === tagToDelete) {
        setSelectedTag(null)
        setAlbums([])
      }
      setTagToDelete(null)
    }
  }

  const handleContextMenu = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    tag: string,
  ) => {
    e.preventDefault()
    setShowWarning(true)
    setTagToDelete(tag)
  }

  const handleHashtagsChange = (hashtags: string[]) => {
    setSelectedHashtags(hashtags)
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
  }

  // const handleCloseDialog = () => {
  //   setShowWarning(false)
  // }

  return (
    <>
      <div className="space-y-0">
        <div className="text-2xl font-bold mb-2">태그별 앨범</div>
        <div className="flex overflow-x-auto items-center mb-4">
          {tags.map((tag) => (
            <HashtagButton
              key={tag}
              text={tag}
              onClick={handleTagClick}
              onContextMenu={handleContextMenu}
            />
          ))}
          {tags.length < 5 && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-2 border-primary-400 rounded-full px-1 text-sm cursor-pointer w-10 h-8"
                >
                  <Plus className="h-4 w-4 text-primary-400" />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-96 h-80 rounded-xl border-2 border-primary-400">
                <DialogHeader>
                  <DialogTitle className="text-primary-400">
                    해시태그 검색
                  </DialogTitle>
                </DialogHeader>
                <p className="text-primary-400 text-left p-0 m-0">
                  1개만 설정 가능합니다
                </p>
                <HashtagSelector
                  onHashtagsChange={handleHashtagsChange}
                  maxHashtags={1}
                />
                <Button onClick={() => addTag()}>저장</Button>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="w-full h-[188px] rounded-md overflow-hidden">
          {tags.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>+ 버튼을 눌러 즐겨찾기할 태그를 설정해보세요. </p>
              <p>최대 5개만 설정이 가능합니다.</p>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center h-full">
              Loading...
            </div>
          ) : selectedTag && albums.length > 0 ? (
            <ScrollArea className="w-full h-full whitespace-nowrap mt-2">
              <div className="flex space-x-0">
                {albums.map((album) => (
                  <Album key={album.albumId} album={album} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          ) : selectedTag ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              No albums found for this tag.
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              태그를 선택하여 앨범을 확인하세요.
            </div>
          )}
        </div>
        {/*{isDialogOpen && (*/}
        {/*  <AlertModal*/}
        {/*    title={''}*/}
        {/*    messages={['정말 삭제하시겠습니까?']}*/}
        {/*    isOpen={showWarning}*/}
        {/*    onClose={handleCloseDialog}*/}
        {/*  />*/}
        {/*)}*/}
        <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
          <AlertDialogContent className="h-60 border-2 border-primary-400">
            <AlertDialogHeader className="flex items-center justify-center">
              <AlertDialogTitle />
              <AlertDialogDescription className="mt-10 text-xl">
                정말 삭제하시겠습니까?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-row justify-evenly items-center">
              <AlertDialogCancel onClick={() => setShowWarning(false)}>
                취소
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  removeTag()
                  setShowWarning(false)
                }}
              >
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}
