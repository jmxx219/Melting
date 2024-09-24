interface HashtagButtonProps {
  text: string
  onClick: (tag: string) => void
  onContextMenu?: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    tag: string,
  ) => void
}

export default function HashtagButton({
  text,
  onClick,
  onContextMenu,
}: HashtagButtonProps) {
  return (
    <div
      className="border-2 border-primary-400 text-primary-400 bg-white hover:bg-primary-400 focus:bg-primary-400 hover:text-white focus:text-white rounded-full px-2 py-1 mr-2 text-sm cursor-pointer"
      onClick={() => onClick(text)}
      onContextMenu={(e) => {
        if (onContextMenu) {
          e.preventDefault()
          onContextMenu(e, text)
        }
      }}
    >
      #{text}
    </div>
  )
}
