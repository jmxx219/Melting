import { SongPlay } from '@/types/songPlay'
import { Heart, Pause, Play } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import AudioPlayer, { AudioPlayerHandle } from './AudioPlayer'
import { useCallback, useRef, useState } from 'react'
import { Button } from '../ui/button'

type Props = {
  song: SongPlay
}

export default function MusicPlayContent({ song }: Props) {
  const lyricsLines = song.lyrics.split('\n')
  const audioPlayerRef = useRef<AudioPlayerHandle>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayPause = useCallback(() => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause()
      } else {
        audioPlayerRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  const handleAudioEnd = useCallback(() => {
    setIsPlaying(false)
  }, [])
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 py-5">
        <img
          src={song.albumCoverImgUrl}
          alt="Album cover"
          className="w-full rounded-lg mb-2"
        />
        <div className="flex items-center">
          <Heart className="w-6 h-6 text-red-500 mr-1" />
          <span className="text-sm text-gray-600">{song.like}</span>
        </div>
      </div>
      <ScrollArea className="py-3">
        <div className="px-4 py-2">
          {lyricsLines.map((line, index) => (
            <div key={index} className="text-[#A5A5A5] text-center my-1">
              {line}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="py-3">
        <AudioPlayer
          ref={audioPlayerRef}
          audioSrc={song.audioSrc}
          onEnded={handleAudioEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
      <div className="py-5 flex justify-center items-center">
        <Button
          size={'icon'}
          className="w-20 h-20 bg-[#FFAF25] rounded-full"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Pause className="w-full h-full p-5" fill="#000000" />
          ) : (
            <Play className="w-full h-full p-5" fill="#000000" />
          )}
        </Button>
      </div>
    </div>
  )
}
