import { Hash } from 'lucide-react'

interface SearchInputProps {
  input: string
  selectedHashtags: string[]
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveHashtag: (tag: string) => void
}

export default function SearchInput({
  input,
  selectedHashtags,
  onInputChange,
  onRemoveHashtag,
}: SearchInputProps) {
  return (
    <div className="relative border-b-2 rounded-md p-2 flex flex-wrap items-center">
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
        onChange={onInputChange}
        placeholder={
          selectedHashtags.length === 0 ? '해시태그를 추가해주세요' : ''
        }
        className="flex-grow outline-none bg-transparent"
        autoComplete="off"
        spellCheck="false"
      />
      <Hash
        size={24}
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${selectedHashtags.length > 0 ? 'text-primary-400' : 'text-gray-400'}`}
      />
    </div>
  )
}
