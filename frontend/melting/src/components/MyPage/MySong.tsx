import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Heart from '@/components/icon/Heart'
import { Mic, Play } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface Track {
  songId: number
  albumCoverImgUrl: string
  songType: string
  likeCount: number
  isLiked: boolean
}

interface MySongProps {
  originalSong: {
    originalSongId: number
    artist: string
    songTitle: string
    songList: Track[]
  }
  isPossibleAiCover: boolean
}

export default function MySong({
  originalSong,
  isPossibleAiCover,
}: MySongProps) {
  const navigate = useNavigate()
  const [tracks, setTracks] = useState(originalSong.songList)

  const goToPlaySong = (songId: number) => {
    // TODO: 곡 재생 화면으로 이동
    navigate(`/music/play`)
  }

  const goToRecordSong = (songId: number) => {
    // TODO: 곡 녹음 화면으로 이동
    navigate(`/music/record`)
  }

  const toggleLike = (trackId: number) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.songId === trackId
          ? { ...track, isLiked: !track.isLiked }
          : track,
      ),
    )

    // TODO: 좋아요 상태 업데이트 API 호출
  }

  return (
    <div className="flex flex-col p-2">
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger className="no-underline hover:no-underline">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="font-bold mr-4">{originalSong.songTitle}</div>
                <div className="text-xs text-gray-400">
                  Original by {originalSong.artist}
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="">
            {tracks.map((track, index) => (
              <div
                key={track.songId}
                className="flex justify-between items-center mb-2"
              >
                <div className="flex items-center">
                  <img
                    src={track.albumCoverImgUrl}
                    alt={`Track ${index + 1}`}
                    className="w-10 h-10 mr-4 rounded-full object-cover"
                  />
                  <div className="text-base w-16">
                    {track.songType === 'melting' ? '멜팅' : 'AI 커버'}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="focus:outline-none z-0"
                      onClick={() => toggleLike(track.songId)}
                    >
                      <Heart
                        fill={track.isLiked ? '#FFAF25' : '#ADADAD'}
                        fillOpacity={track.isLiked ? 1 : 0.4}
                      />
                    </button>
                    <span className="w-12 text-center">
                      {track.likeCount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      track.songType === 'melting' || isPossibleAiCover
                        ? 'bg-primary-400'
                        : 'bg-gray-200'
                    }`}
                    onClick={() => {
                      if (track.songType === 'melting' || isPossibleAiCover) {
                        goToRecordSong(track.songId)
                      }
                    }}
                  >
                    {' '}
                    <Mic className="h-5 w-5 text-white" />
                  </button>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center"
                    onClick={() => goToPlaySong(track.songId)}
                  >
                    <Play className="h-5 w-5 text-white fill-white" />
                  </button>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
