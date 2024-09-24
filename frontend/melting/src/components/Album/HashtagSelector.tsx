// src/components/Album/HashtagSelector.tsx

import { useState, useEffect } from 'react'
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
      if (input.length > 0) {
        const results = await searchHashtags(input.replace(/^#/, ''))
        setSuggestions(results)
        setIsDropdownOpen(true)
      } else {
        setSuggestions([])
        setIsDropdownOpen(false)
      }
    }
    fetchSuggestions()
  }, [input])

  useEffect(() => {
    if (!useAlbumContextFlag && onHashtagsChange) {
      onHashtagsChange(localSelectedHashtags)
    }
  }, [localSelectedHashtags, onHashtagsChange, useAlbumContextFlag])

  const addHashtag = (tag: string) => {
    if (selectedHashtags && setSelectedHashtags) {
      if (
        selectedHashtags.length < maxHashtags &&
        !selectedHashtags.includes(tag)
      ) {
        setSelectedHashtags([...selectedHashtags, tag])
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value.startsWith('#') ? value : '#' + value)
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
