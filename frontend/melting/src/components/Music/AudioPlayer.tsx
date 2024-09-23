import React, { useEffect, useRef, useState } from 'react'

interface AudioPlayerProps {
  audioSrc: string
  onTimeUpdate?: (currentTime: number) => void
  onEnded?: () => void
}

export default function AudioPlayer({
  audioSrc,
  onTimeUpdate,
  onEnded,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleLoadedMetadata = () => setDuration(audio.duration)
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime)
        onTimeUpdate?.(audio.currentTime)
      }
      const handleEnded = () => onEnded?.()

      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('ended', handleEnded)

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('ended', handleEnded)
      }
    }
  }, [onTimeUpdate, onEnded])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (Number(e.target.value) / 100) * duration
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  return (
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
      <audio ref={audioRef} src={audioSrc} />
    </div>
  )
}
