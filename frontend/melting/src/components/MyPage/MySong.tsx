import { useState } from 'react'
import Heart from '@/components/icon/Heart'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface MySongProps {
  song: {
    songId: number
    artist: string
    songTitle: string
    nickname: string
    songList: {
      albumCoverImgUrl: string
      songType: 'melting' | 'AICover'
      likeCount: number
      isLiked: boolean
    }[]
  }
}

export default function MySong({ song }: MySongProps) {
  return (
    <div className="flex flex-col p-2">
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger className="no-underline hover:no-underline">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="font-bold mr-4">{song.songTitle}</div>
                <div className="text-xs text-gray-400">
                  Original by {song.artist}
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="">
            {song.songList.map((track, index) => (
              <div
                key={index}
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
                      onClick={(e) => {
                        e.stopPropagation()
                        track.isLiked = !track.isLiked
                      }}
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
                  <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    2
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
