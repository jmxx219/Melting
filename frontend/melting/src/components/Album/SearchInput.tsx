import React, { useState, useEffect, useCallback } from 'react'
import { Hash } from 'lucide-react'

interface SearchInputProps {
  input: string
  selectedHashtags: string[]
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveHashtag: (tag: string) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onCompositionStart: () => void
  onCompositionEnd: () => void
}

export default function SearchInput({
  input,
  selectedHashtags,
  onInputChange,
  onRemoveHashtag,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
}: SearchInputProps) {
  const [warningMessage, setWarningMessage] = useState<string | null>(null)
  const [isComposing, setIsComposing] = useState(false)

  const validateInput = useCallback((value: string) => {
    if (value === '') {
      setWarningMessage(null)
      return true
    }

    if (value.length > 50) {
      setWarningMessage('50자 이내로 작성해주세요.')
      return false
    }
    if (value.includes(' ')) {
      setWarningMessage('띄어쓰기 대신 언더바(_)를 사용해주세요.')
      return false
    }
    if (!/^[a-zA-Z0-9가-힣_]+$/.test(value)) {
      setWarningMessage('특수문자는 사용할 수 없습니다. (언더바 제외)')
      return false
    }
    // 자음만으로 이루어진 경우 체크
    if (/^[ㄱ-ㅎ]+$/.test(value)) {
      setWarningMessage('자음만으로 이루어진 해시태그는 사용할 수 없습니다.')
      return false
    }
    // 단어 중간에 자음만 있는 경우 체크
    if (/[가-힣ㄱ-ㅎ]+[ㄱ-ㅎ]+[가-힣ㄱ-ㅎ]*/.test(value)) {
      setWarningMessage(
        '단어 중간에 자음만 있는 해시태그는 사용할 수 없습니다.',
      )
      return false
    }
    setWarningMessage(null)
    return true
  }, [])

  useEffect(() => {
    if (!isComposing) {
      validateInput(input)
    }
  }, [input, isComposing, validateInput])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.length <= 50 && !newValue.includes(' ')) {
      onInputChange(e)
      if (!isComposing) {
        validateInput(newValue)
      }
    } else if (newValue.includes(' ')) {
      setWarningMessage('띄어쓰기 대신 언더바(_)를 사용해주세요.')
    } else if (newValue.length > 50) {
      setWarningMessage('50자 이내로 작성해주세요.')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (warningMessage || !validateInput(input)) {
        e.preventDefault()
        return
      }
    }
    onKeyDown && onKeyDown(e)
  }

  const handleCompositionStart = () => {
    setIsComposing(true)
    onCompositionStart()
  }

  const handleCompositionEnd = () => {
    setIsComposing(false)
    onCompositionEnd()
    validateInput(input)
  }

  return (
    <div className="space-y-2">
      <div className="relative border-b-2 p-2 flex flex-wrap items-center">
        {selectedHashtags.map((tag) => (
          <span
            key={tag}
            className="border-2 border-primary-400 rounded-full px-2 py-1 text-sm mr-2 mb-2 cursor-pointer"
            onClick={() => onRemoveHashtag(tag)}
          >
            #{tag}
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={
            selectedHashtags.length === 0 ? '해시태그를 추가해주세요' : ''
          }
          className="flex-grow outline-none bg-transparent"
          autoComplete="off"
          spellCheck="false"
          maxLength={50}
        />
        <Hash
          size={24}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            selectedHashtags.length > 0 ? 'text-primary-400' : 'text-gray-400'
          }`}
        />
      </div>
      <div className="w-full h-1">
        {warningMessage && (
          <p className="text-red-500 text-sm mt-1">{warningMessage}</p>
        )}
      </div>
    </div>
  )
}
