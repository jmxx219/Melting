import { useEffect, useState, useCallback, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import { AlbumRankingResponseDto } from '@/types/album'
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
import Album from '../Community/Album'
import HashtagSelector from '@/components/Album/HashtagSelector'
import HashtagButton from '../Button/HashtagButton'
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { userApi } from '@/apis/userApi.ts'
import { albumApi } from '@/apis/albumApi.ts'

export default function TagAlbum() {
  const [tags, setTags] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [albums, setAlbums] = useState<AlbumRankingResponseDto[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [showWarning, setShowWarning] = useState(false)
  const [tagToDelete, setTagToDelete] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isError, setIsError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 3
  const retryDelay = 1000 // 1초

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const userTags = await userApi.getMemberHashtags()
        setTags(userTags)
      } catch (error) {
        console.error('태그 불러오기 실패:', error)
      }
    }

    fetchTags()
  }, [])

  const fetchAlbums = useCallback(async () => {
    if (!selectedTag || !hasMore || isLoading) return

    setIsLoading(true)
    setIsError(false)
    try {
      const response = await albumApi.getAlbumPageContainsHashtag(selectedTag, {
        page,
        size: 5,
      })
      const newAlbums = response.albums || []
      setAlbums((prevAlbums) => [...prevAlbums, ...newAlbums])
      setPage((prevPage) => prevPage + 1)
      setHasMore(newAlbums.length > 0 && !response.isLast)
      setRetryCount(0) // 성공 시 retry 카운트 리셋
    } catch (error) {
      console.error('앨범 조회 실패:', error)
      setIsError(true)
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount((prevCount) => prevCount + 1)
          setIsLoading(false) // 재시도를 위해 로딩 상태 해제
        }, retryDelay)
      }
    } finally {
      if (!isError) {
        setIsLoading(false)
      }
    }
  }, [selectedTag, page, hasMore, isLoading, retryCount])

  useEffect(() => {
    if (selectedTag) {
      setAlbums([])
      setPage(0)
      setHasMore(true)
      fetchAlbums()
    }
  }, [selectedTag])

  const addTag = async () => {
    if (selectedHashtags.length > 0) {
      const tag = selectedHashtags[0]
      if (tags.length < 5 && !tags.includes(tag)) {
        try {
          await userApi.addMemberHashtag({ content: tag })
          setTags([...tags, tag])
          setSelectedHashtags([])
          setIsDialogOpen(false)
        } catch (error) {
          console.error('태그 추가 실패:', error)
        }
      }
    }
  }

  const removeTag = async () => {
    if (tagToDelete) {
      try {
        await userApi.deleteMemberHashtag({ content: tagToDelete }) // 태그 삭제 API 호출
        setTags(tags.filter((tag) => tag !== tagToDelete)) // UI에서 태그 제거
        if (selectedTag === tagToDelete) {
          setSelectedTag(null)
          setAlbums([])
        }
        setTagToDelete(null)
      } catch (error) {
        console.error('태그 삭제 실패:', error)
      }
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
    setAlbums([])
    setPage(0)
    setHasMore(true)
  }

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      fetchAlbums()
    }
  }, [inView, hasMore, isLoading, fetchAlbums])

  return (
    <>
      <div className="space-y-0">
        <div className="text-2xl font-bold mb-2">태그별 앨범</div>
        <div className="flex overflow-x-auto items-center mb-4">
          {tags.map((tag) => (
            <HashtagButton
              key={tag}
              text={tag}
              onClick={() => handleTagClick(tag)}
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
                  1개씩 설정 가능합니다
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
        <div className="w-full h-[208px] rounded-md overflow-hidden">
          {tags.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>+ 버튼을 눌러 즐겨찾기할 태그를 설정해보세요. </p>
              <p>최대 5개만 설정이 가능합니다.</p>
            </div>
          ) : selectedTag ? (
            <ScrollArea
              className="w-full h-full whitespace-nowrap mt-2"
              ref={scrollAreaRef}
            >
              <div className="flex space-x-0">
                {albums.map((album) => (
                  <Album key={album.albumId} album={album} />
                ))}
                {isLoading && <div className="">로딩 중...</div>}
                {hasMore && !isLoading && (
                  <div ref={inViewRef} className="w-10 h-10" /> // 트리거 요소
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              태그를 선택하여 앨범을 확인하세요.
            </div>
          )}
        </div>
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
