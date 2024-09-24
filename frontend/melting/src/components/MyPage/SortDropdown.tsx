import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

interface SortDropdownProps {
  initialSort: 'date' | 'popularity'
  onSelect: (value: 'date' | 'popularity') => void
}

export default function SortDropdown({
  initialSort,
  onSelect,
}: SortDropdownProps) {
  const [selectedSort, setSelectedSort] = useState<'date' | 'popularity'>(
    initialSort,
  )

  const getSortLabel = (sortOption: 'date' | 'popularity') => {
    switch (sortOption) {
      case 'date':
        return '최신순'
      case 'popularity':
        return '인기순'
      default:
        return ''
    }
  }

  const handleSelect = (sortOption: 'date' | 'popularity') => {
    setSelectedSort(sortOption)
    onSelect(sortOption)
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
            <span className="text-xs">{getSortLabel(selectedSort)}</span>
            <ChevronDown />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-secondary rounded-xl p-1 border-primary-400 border-2"
      >
        <div className="space-y-2">
          <DropdownMenuItem
            className={`rounded-full text-xs ${selectedSort === 'date' ? 'bg-primary-400 text-white' : 'bg-white text-primary-400'}`}
            onClick={() => handleSelect('date')}
          >
            최신순
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`rounded-full text-xs ${selectedSort === 'popularity' ? 'bg-primary-400 text-white' : 'bg-white text-primary-400'}`}
            onClick={() => handleSelect('popularity')}
          >
            인기순
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
