type MusicPlayerHeaderProps = {
  songTitle: string
  artist: string
}

export default function MusicPlayerHeader({ songTitle, artist }: MusicPlayerHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{songTitle}</h1>
      <h2 className="text-lg text-[#A5A5A5]">{artist}</h2>
    </div>
  )
}
