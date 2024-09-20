import { useEffect, useRef, useState } from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Button } from '../ui/button'
import { Mic, RotateCcw } from 'lucide-react'
import { Progress } from '../ui/progress'
interface MusciRecordProps {
  lyrics: string
  audioSrc: string
}

export default function MusciRecordContent({ lyrics, audioSrc }: MusciRecordProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isEnd, setIsEnd] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const lyricsLines = lyrics.split('\n')
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current!.duration)
      })
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current!.currentTime)
      })
      audioRef.current.addEventListener('play', () => {
        setIsPlaying(true)
      })
      audioRef.current.addEventListener('pause', () => {
        setIsPlaying(false)
      })
      audioRef.current.addEventListener('ended', () => {
        setIsEnd(true)
      })
    }
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleRecordClick = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        mediaRecorderRef.current = new MediaRecorder(stream)
        mediaRecorderRef.current.start()
        setIsRecording(true)
        if (audioRef.current) {
          audioRef.current.play()
        }
      } catch (err) {
        console.error('Error accessing the microphone', err)
      }
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop()
      }
      setIsRecording(false)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (Number(e.target.value) / 100) * duration
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow">
        <div className="px-4 py-2">
          {lyricsLines.map((line, index) => (
            <div key={index} className="text-[#A5A5A5] text-center my-1">
              {line}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="text-center pb-5 pt-10">
        <Button
          variant="outline"
          size="icon"
          className="w-20 h-20 bg-[#FFAF25] rounded-full"
          onClick={handleRecordClick}
        >
          {isPlaying || isEnd ? (
            <RotateCcw className="w-full h-full p-5 text-white" />
          ) : (
            <Mic className="w-full h-full p-5 text-white" />
          )}
        </Button>
      </div>
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleProgressChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer progress-bg-orange"
          style={{
            background: `linear-gradient(to right, #FFB74D 0%, #FFB74D ${
              (currentTime / duration) * 100
            }%, #FFF3DF ${(currentTime / duration) * 100}%, #FFF3DF 100%)`,
          }}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-0.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <audio ref={audioRef} src={audioSrc} />

      <div>
        <Button className={`w-full rounded-full font-bold py-7 text-white ${!isEnd ? 'bg-[#A5A5A5]' : 'bg-[#FFAF25]'}`}>
          완료
        </Button>
      </div>
    </div>
  )
}
