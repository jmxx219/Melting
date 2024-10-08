import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { CoverType } from '@/types/constType.ts'

interface SongDropdownProps {
  initialType: CoverType
  onSelect: (value: CoverType) => void
  disabledOptions: {
    melting: boolean
    ai: boolean
  }
}

export default function SongDropdown({
  initialType,
  onSelect,
  disabledOptions,
}: SongDropdownProps) {
  const [selectedOption, setSelectedOption] = useState<CoverType>(initialType)

  // 선택한 옵션에 따라 표시되는 텍스트를 매핑하는 함수
  const getOptionLabel = (option: CoverType) => {
    switch (option) {
      case 'melting':
        return '#멜팅'
      case 'ai':
        return '#AI 커버'
      default:
        return ''
    }
  }

  const handleSelect = (option: CoverType) => {
    if (
      (option === 'melting' && disabledOptions.melting) ||
      (option === 'ai' && disabledOptions.ai)
    ) {
      return
    }
    setSelectedOption(option)
    onSelect(option)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex items-center border-2 border-primary-400 text-primary-400 rounded-3xl pl-2 pr-1 py-0 h-7"
        >
          <div className="flex justify-center items-center">
            {/* 선택된 옵션에 맞는 텍스트를 렌더링 */}
            <span className="text-xs">{getOptionLabel(selectedOption)}</span>
            <ChevronDown />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-secondary rounded-xl p-1 border-primary-400 border-2"
      >
        <div className="flex space-x-2">
          <DropdownMenuItem
            className={`rounded-full text-xs ${selectedOption === 'melting' ? 'bg-primary-400 text-white' : 'bg-white text-primary-400'} ${disabledOptions.melting ? 'opacity-50 text-gray cursor-not-allowed' : ''}`}
            onClick={() => handleSelect('melting')}
            disabled={disabledOptions.melting}
          >
            #멜팅
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`rounded-full text-xs ${selectedOption === 'ai' ? 'bg-primary-400 text-white' : 'bg-white text-primary-400'} ${disabledOptions.ai ? 'opacity-50 text-gray cursor-not-allowed' : ''}`}
            onClick={() => handleSelect('ai')}
            disabled={disabledOptions.ai}
          >
            #AI 커버
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
