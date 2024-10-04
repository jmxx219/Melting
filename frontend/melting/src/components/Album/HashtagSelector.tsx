// src/components/Album/HashtagSelector.tsx

import { useState, useEffect, useRef } from 'react'

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
import { searchHashtags } from '@/apis/albumApi'
import SearchInput from '../Album/SearchInput'
import SearchDropdown from '../Album/SearchDropdown'
import useDebounce from '@/hooks/useDebounce'

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

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedInput.length > 0) {
        const searchTerm = debouncedInput.startsWith('#')
          ? debouncedInput.slice(1)
          : debouncedInput
        const results = await searchHashtags(searchTerm)
        setSuggestions(results)
        setIsDropdownOpen(true)
      } else {
        setSuggestions([])
        setIsDropdownOpen(false)
      }
    }
    fetchSuggestions()
  }, [debouncedInput])

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
        // '#'만 있는 경우를 방지
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
  }

  if (!selectedHashtags || !setSelectedHashtags) {
    return null // or some error state
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
      <SearchDropdown
        isOpen={isDropdownOpen}
        suggestions={suggestions}
        onSelectSuggestion={addHashtag}
      />
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
