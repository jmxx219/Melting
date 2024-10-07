import { SongDetailsResponseDto } from '@/types/album'
import {
  Heart,
  LoaderCircle,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import AudioPlayer, { AudioPlayerHandle } from './AudioPlayer'

type MusicPlayProps = {
  song: SongDetailsResponseDto
  isAlbumPlay?: boolean
  onNext?: () => void
  onPrev?: () => void
}

export default function MusicPlayContent({
  song,
  isAlbumPlay = false,
  onNext,
  onPrev,
}: MusicPlayProps) {
  const [lyricsLines, setLyricsLines] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const audioPlayerRef = useRef<AudioPlayerHandle>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setLyricsLines(
        song.lyrics ? song.lyrics.split('\n') : ['가사가 존재하지 않습니다.'],
      )
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [song])

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
    if (isAlbumPlay && onNext) {
      onNext()
      setTimeout(() => {
        if (audioPlayerRef.current) {
          audioPlayerRef.current.play()
          setIsPlaying(true)
        }
      }, 0)
    } else {
      setIsPlaying(false)
    }
  }, [isAlbumPlay, onNext])

  useEffect(() => {
    if (audioPlayerRef.current && isPlaying) {
      audioPlayerRef.current.play()
    }
  }, [song, isPlaying])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 py-5">
        <img
          src={song.albumCoverImageUrl}
          alt="Album cover"
          className="w-full h-full rounded-lg mb-2"
        />
        <div className="flex items-center">
          <Heart className="w-6 h-6 text-red-500 mr-1" />
          <span className="text-sm text-gray-600">{song.likedCount}</span>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center overflow-hidden">
        {isLoading ? (
          <LoaderCircle className="animate-spin w-12 h-12 text-gray-500" />
        ) : (
          <ScrollArea className="w-full h-full py-3">
            <div className="px-4 py-2">
              {lyricsLines.map((line, index) => (
                <div key={index} className="text-[#A5A5A5] text-center my-1">
                  {line}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
      <div className="py-3">
        <AudioPlayer
          ref={audioPlayerRef}
          audioSrc={song.songUrl ?? ''}
          onEnded={handleAudioEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
      <div className="py-5 flex justify-center items-center">
        {isAlbumPlay && (
          <Button
            type="button"
            size={'icon'}
            variant="ghost"
            className="w-17 h-17 rounded-full me-5"
            onClick={onPrev}
          >
            <SkipBack className="w-full h-full p-5" fill="#000000" />
          </Button>
        )}
        <Button
          type="button"
          size={'icon'}
          className="w-17 h-17 bg-[#FFAF25] rounded-full"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Pause className="w-full h-full p-5" fill="#000000" />
          ) : (
            <Play className="w-full h-full p-5" fill="#000000" />
          )}
        </Button>
        {isAlbumPlay && (
          <Button
            type="button"
            size={'icon'}
            variant="ghost"
            className="w-17 h-17 rounded-full ms-5"
            onClick={onNext}
          >
            <SkipForward className="w-full h-full p-5" fill="#000000" />
          </Button>
        )}
      </div>
    </div>
  )
}
