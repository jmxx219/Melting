interface SearchDropdownProps {
  isOpen: boolean
  suggestions: string[]
  onSelectSuggestion: (suggestion: string) => void
}

export default function SearchDropdown({
  isOpen,
  suggestions,
  onSelectSuggestion,
}: SearchDropdownProps) {
  if (!isOpen || suggestions.length === 0) return null

  return (
    <ul className="absolute z-10 w-5/6 bg-white rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
      {suggestions.map((suggestion) => (
        <li
          key={suggestion}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelectSuggestion(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  )
}
