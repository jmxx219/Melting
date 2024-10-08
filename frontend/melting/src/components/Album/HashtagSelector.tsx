import { useState, useEffect, useRef, useCallback } from 'react'
import { useAlbumContext } from '@/contexts/AlbumContext'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import SearchInput from '../Album/SearchInput'
import SearchDropdown from '../Album/SearchDropdown'
import useDebounce from '@/hooks/useDebounce'
import { hashtagApi } from '@/apis/hashtagApi'
import InfiniteScroll from '@/components/Common/InfinityScroll.tsx'
import { HashtagPageResponseDto, HashtagResponseDto } from '@/types/hashtag.ts'

interface HashtagSelectorProps {
  onHashtagsChange?: (hashtags: string[]) => void
  maxHashtags?: number
  initialHashtags?: string[]
  useAlbumContextFlag?: boolean
}

export default function HashtagSelector({
  onHashtagsChange,
  maxHashtags = 3,
  initialHashtags = [],
  useAlbumContextFlag = false,
}: HashtagSelectorProps) {
  const albumContext = useAlbumContextFlag ? useAlbumContext() : null
  const [localSelectedHashtags, setLocalSelectedHashtags] =
    useState<string[]>(initialHashtags)
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const debouncedInput = useDebounce(input, 300)
  const composingRef = useRef(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const selectedHashtags = useAlbumContextFlag
    ? albumContext?.selectedHashtags
    : localSelectedHashtags
  const setSelectedHashtags = useAlbumContextFlag
    ? albumContext?.setSelectedHashtags
    : setLocalSelectedHashtags

  useEffect(() => {
    if (useAlbumContextFlag && albumContext?.selectedHashtags) {
      setLocalSelectedHashtags(albumContext.selectedHashtags)
    }
  }, [useAlbumContextFlag, albumContext?.selectedHashtags])

  const fetchSuggestions = useCallback(
    async (searchTerm: string, currentPage: number) => {
      if (searchTerm.length > 0) {
        setLoading(true)
        try {
          const results: HashtagPageResponseDto =
            await hashtagApi.searchHashtags(searchTerm, currentPage, 10)

          //console.log(results)
          const hashtagContents =
            results.hashtags?.map(
              (hashtag: HashtagResponseDto) => hashtag.content,
            ) || []
          //console.log(hashtagContents)

          if (currentPage === 0) {
            setSuggestions(hashtagContents)
          } else {
            setSuggestions((prev) => [...prev, ...hashtagContents])
          }
          setHasMore(!results.isLast)
          setIsDropdownOpen(true)
        } catch (error) {
          console.error('해시태그 검색 중 오류 발생:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setSuggestions([])
        setIsDropdownOpen(false)
      }
    },
    [],
  )

  useEffect(() => {
    setPage(1)
    fetchSuggestions(debouncedInput, 0)
  }, [debouncedInput, fetchSuggestions])

  const loadMore = useCallback(() => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchSuggestions(debouncedInput, nextPage)
  }, [debouncedInput, fetchSuggestions, page])

  useEffect(() => {
    if (!useAlbumContextFlag && onHashtagsChange) {
      onHashtagsChange(localSelectedHashtags)
    }
  }, [localSelectedHashtags, onHashtagsChange, useAlbumContextFlag])

  const addHashtag = (tag: string) => {
    if (selectedHashtags && setSelectedHashtags) {
      const newTag = tag.startsWith('#') ? tag.slice(1) : tag
      if (
        selectedHashtags.length < maxHashtags &&
        !selectedHashtags.includes(newTag) &&
        newTag.trim() !== ''
      ) {
        setSelectedHashtags([...selectedHashtags, newTag])
        setInput('')
        setSuggestions([])
        setIsDropdownOpen(false)
      } else if (selectedHashtags.length >= maxHashtags) {
        setShowWarning(true)
      }
    }
  }

  const removeHashtag = (tag: string) => {
    if (selectedHashtags && setSelectedHashtags) {
      setSelectedHashtags(selectedHashtags.filter((t) => t !== tag))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !composingRef.current) {
      e.preventDefault()
      const newTag = input.trim()
      if (newTag.length > 1) {
        addHashtag(newTag)
      }
    }
  }

  const handleCompositionStart = () => {
    composingRef.current = true
  }

  const handleCompositionEnd = () => {
    composingRef.current = false
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    setPage(1)
  }

  if (!selectedHashtags || !setSelectedHashtags) {
    return null
  }

  return (
    <div className="space-y-2">
      <SearchInput
        input={input}
        selectedHashtags={selectedHashtags}
        onInputChange={handleInputChange}
        onRemoveHashtag={removeHashtag}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      {isDropdownOpen && (
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loading={loading}>
          <SearchDropdown
            suggestions={suggestions}
            onSelectSuggestion={addHashtag}
          />
        </InfiniteScroll>
      )}
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>해시태그 제한</AlertDialogTitle>
            <AlertDialogDescription>
              해시태그는 최대 {maxHashtags}개까지만 선택할 수 있습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowWarning(false)}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
