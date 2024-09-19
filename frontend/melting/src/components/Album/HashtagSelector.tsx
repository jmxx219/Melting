import { useState, useEffect, useRef } from 'react'
import { Hash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

// 가상의 API 호출 함수 (실제 구현 시 이 부분을 실제 API로 대체해야 합니다)
const searchHashtags = async (query: string): Promise<string[]> => {
  // 실제 API 호출 대신 임시 데이터 반환
  return ['#사진', '#사랑해', '#사랑합니다', '#사진스타그램'].filter((tag) =>
    tag.includes(query),
  )
}

interface HashtagSelectorProps {
  onHashtagsChange: (hashtags: string[]) => void
}

export default function HashtagSelector({
  onHashtagsChange,
}: HashtagSelectorProps) {
  const [input, setInput] = useState('')
  const [hashtags, setHashtags] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null) // 드롭다운 영역을 참조하는 ref

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length > 1) {
        const results = await searchHashtags(input)
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
    onHashtagsChange(hashtags)
  }, [hashtags, onHashtagsChange])

  const addHashtag = (tag: string) => {
    if (hashtags.length < 3 && !hashtags.includes(tag)) {
      setHashtags([...hashtags, tag])
      setInput('#')
      setSuggestions([])
      setIsDropdownOpen(false)
    } else if (hashtags.length >= 3) {
      setShowWarning(true)
    }
  }

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value.startsWith('#') ? value : '#' + value)
  }

  // 드롭다운 외부 클릭을 감지하는 useEffect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false) // 드롭다운 외부를 클릭하면 닫기
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const handleCloseWarning = () => {
    setShowWarning(false)
  }

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <div className="relative border-b-2 rounded-md p-2 flex flex-wrap items-center">
        {hashtags.map((tag, index) => (
          <span
            key={index}
            className="border-2 border-primary-400 rounded-full px-2 py-1 text-sm mr-2 mb-2 cursor-pointer"
            onClick={() => removeHashtag(tag)}
          >
            {tag}
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder={hashtags.length === 0 ? '해시태그를 추가해주세요' : ''}
          className="flex-grow outline-none bg-transparent"
          autoComplete="false"
          spellCheck="false"
        />
        <Hash
          size={24}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${hashtags.length > 0 ? 'text-primary-400' : 'text-gray-400'}`}
        />
      </div>
      {isDropdownOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => addHashtag(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>해시태그 제한</AlertDialogTitle>
            <AlertDialogDescription>
              해시태그는 최대 3개까지만 선택할 수 있습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleCloseWarning}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
