import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  onSearch: () => void
  placeholderText?: string
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  onSearch,
  placeholderText = 'Search...',
}: SearchBarProps) {
  return (
    <div className="flex w-full items-center rounded-full bg-gray-100 text-black px-4 py-1">
      <Input
        placeholder={placeholderText}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        className="border-none bg-transparent flex-grow"
      />
      <Button variant={'ghost'} onClick={onSearch} className="ml-2">
        <Search size={24} />
      </Button>
    </div>
  )
}
