import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Heart from '@/components/Icon/Heart'
import { Mic, Play, LoaderCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SongListDto, SongMypageDto } from '@/types/user'
import { songApi } from '@/apis/songApi'

interface MySongProps {
  originalSong: SongListDto
  isPossibleAiCover: boolean
}

export default function MySongContent({
  originalSong,
  isPossibleAiCover,
}: MySongProps) {
  const navigate = useNavigate()
  const [mySongs, setMySongs] = useState<SongMypageDto[]>(
    originalSong.songList ?? [],
  )

  const goToPlaySong = (songId: number) => {
    navigate(`/music/play`, { state: { songId } })
  }

  const goToRecordSong = (songId: number) => {
    navigate(`/music/record`, { state: { songId: songId } })
  }

  const toggleLike = async (songId: number, isLiked: boolean) => {
    let currentLikedCount = 0
    try {
      if (isLiked) {
        currentLikedCount = await songApi.deleteSongLikes(songId)
      } else {
        currentLikedCount = await songApi.addSongLikes(songId)
      }

      setMySongs((prevMySongs) =>
        prevMySongs.map((mySong) =>
          mySong.songId === songId
            ? {
                ...mySong,
                isLiked: !mySong.isLiked,
                likeCount: currentLikedCount,
              }
            : mySong,
        ),
      )
    } catch (error) {
      console.error('나의 곡 좋아요 상태 업데이트 중 오류 발생:', error)
    }
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
            {mySongs.map((mySong, index) => (
              <div
                key={mySong.songId}
                className={`flex justify-between items-center mb-2 pl-2 ${
                  mySong.isCreated ? '' : 'text-gray-400'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 items-center mr-4">
                    {mySong.isCreated === true ? (
                      <img
                        src={mySong.albumCoverImageUrl}
                        alt={`mySong ${index + 1}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center flex-col justify-center">
                        <LoaderCircle className="animate-spin w-8 h-8 text-primary-400" />
                      </div>
                    )}
                  </div>
                  <div className="text-base w-16">
                    {mySong.songType === 'MELTING' ? '멜팅' : 'AI 커버'}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="focus:outline-none z-0"
                      onClick={() =>
                        mySong.isCreated &&
                        toggleLike(mySong.songId, mySong.isLiked!)
                      }
                      disabled={!mySong.isCreated}
                    >
                      <Heart
                        fill={
                          mySong.isLiked && mySong.isCreated
                            ? '#FFAF25'
                            : '#ADADAD'
                        }
                        fillOpacity={
                          mySong.isLiked && mySong.isCreated ? 1 : 0.4
                        }
                      />
                    </button>
                    <span className="w-12">
                      {mySong.likeCount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      (mySong.songType === 'MELTING' || isPossibleAiCover) &&
                      mySong.isCreated
                        ? 'bg-primary-400'
                        : 'bg-gray-200'
                    }`}
                    onClick={() => {
                      if (mySong.songType === 'MELTING' || isPossibleAiCover) {
                        goToRecordSong(mySong.songId)
                      }
                    }}
                    disabled={!mySong.isCreated}
                  >
                    {' '}
                    <Mic className="h-5 w-5 text-white" />
                  </button>
                  <button
                    type="button"
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      mySong.isCreated ? 'bg-primary-400' : 'bg-gray-200'
                    }`}
                    onClick={() => goToPlaySong(mySong.songId)}
                    disabled={!mySong.isCreated}
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
