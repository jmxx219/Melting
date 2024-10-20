import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { SortType, sort } from '@/types/constType'

interface SortDropdownProps {
  initialSort: SortType
  showText?: boolean
  onSelect: (value: SortType) => void
}

type Checked = DropdownMenuCheckboxItemProps['checked']

export default function SortDropdown({
  initialSort,
  showText = true,
  onSelect,
}: SortDropdownProps) {
  const [selectedSort, setSelectedSort] = useState<SortType>(initialSort)
  const [isDateChecked, setIsDateChecked] = useState<Checked>(
    initialSort === sort.LATEST,
  )
  const [isPopularityChecked, setIsPopularityChecked] = useState<Checked>(
    initialSort === sort.POPULAR,
  )

  const getSortLabel = (sortOption: SortType) => {
    switch (sortOption) {
      case sort.LATEST:
        return '최신순'
      case sort.POPULAR:
        return '인기순'
      default:
        return ''
    }
  }

  const handleSelect = (sortOption: SortType) => {
    setSelectedSort(sortOption)
    onSelect(sortOption)

    // 상태 업데이트
    if (sortOption === sort.LATEST) {
      setIsDateChecked(true)
      setIsPopularityChecked(false)
    } else {
      setIsDateChecked(false)
      setIsPopularityChecked(true)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex items-center border-none  rounded-3xl pl-2 pr-1 py-0 h-7"
        >
          <div className="flex justify-center items-center">
            {showText && (
              <span className="text-sm">{getSortLabel(selectedSort)}</span>
            )}
            <ChevronDown />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white rounded-xl p-1 border-gray-100  min-w-20"
      >
        <DropdownMenuCheckboxItem
          checked={isDateChecked}
          onCheckedChange={() => handleSelect(sort.LATEST)}
          // className={`rounded-full text-xs w-20 mb-2 ${isDateChecked ? 'bg-primary-400 text-white' : 'bg-white text-primary-400'}`}
          className={`rounded-full text-xs w-20 mb-2 `}
        >
          최신순
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={isPopularityChecked}
          onCheckedChange={() => handleSelect(sort.POPULAR)}
          // className={`rounded-full text-xs w-20 ${isPopularityChecked ? 'bg-primary-400 text-white' : 'bg-white text-primary-400'}`}
          className={`rounded-full text-xs w-20`}
        >
          인기순
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
