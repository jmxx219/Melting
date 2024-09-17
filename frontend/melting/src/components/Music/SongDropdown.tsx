import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

interface SongDropdownProps {
  initialType: 'melting' | 'ai'
  onSelect: (value: 'melting' | 'ai') => void // onSelect를 props로 받음
}

export default function SongDropdown({
  initialType,
  onSelect,
}: SongDropdownProps) {
  const [selectedOption, setSelectedOption] = useState<'melting' | 'ai'>(
    initialType,
  )

  // 선택한 옵션에 따라 표시되는 텍스트를 매핑하는 함수
  const getOptionLabel = (option: 'melting' | 'ai') => {
    switch (option) {
      case 'melting':
        return '#멜팅'
      case 'ai':
        return '#AI 커버'
      default:
        return ''
    }
  }

  const handleSelect = (option: 'melting' | 'ai') => {
    setSelectedOption(option)
    onSelect(option) // 상위 컴포넌트에 선택된 값을 전달
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
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
            className={`rounded-full text-xs ${selectedOption === 'melting' ? 'bg-primary-400 text-white' : 'bg-white text-primary-400'}`}
            onClick={() => handleSelect('melting')}
          >
            #멜팅
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`rounded-full text-xs ${selectedOption === 'ai' ? 'bg-primary-400 text-white' : 'bg-white text-primary-400'}`}
            onClick={() => handleSelect('ai')}
          >
            #AI 커버
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
