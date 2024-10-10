import { songApi } from '@/apis/songApi'
import { Mic, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AlertModal from '../Common/AlertModal'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import AudioPlayer, { AudioPlayerHandle } from './AudioPlayer'
import { tab } from '@/types/constType'
import LodingModal from '../Common/LoadingModal'

interface MusciRecordProps {
  lyrics?: string
  audioSrc?: string
  originalSongId?: number
}

export default function MusciRecordContent({
  lyrics = '',
  audioSrc = '',
  originalSongId = -1,
}: MusciRecordProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [isEnd, setIsEnd] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioPlayerRef = useRef<AudioPlayerHandle>(null)
  const navigate = useNavigate()

  const [modalText, setModalText] = useState<string[]>([])
  const [modalTitle, setModalTitle] = useState<string>('')
  const [isApiModal, setIsApiModal] = useState<boolean>(false)
  const [isLoading, setisLoading] = useState<boolean>(false)
  const location = useLocation()
  useEffect(() => {
    setModalTitle('안내')
    setModalText(['깔끔한 녹음을 위해', '조용한 곳에서 녹음 해주세요'])
    setIsDialogOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsDialogOpen(false)
    if (isApiModal) {
      navigate(`/mypage/my/${tab.SONG}`)
    }
  }, [isApiModal, navigate])

  const stopMicrophoneUsage = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.stop()
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsRecording(false)
    audioPlayerRef.current?.stop()
  }, [])

  const processRecordedAudio = useCallback(() => {
    const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
    return blob
  }, [])

  const resetRecording = useCallback(() => {
    stopMicrophoneUsage()
    setIsEnd(false)
    chunksRef.current = []
  }, [stopMicrophoneUsage])

  const handleCancel = useCallback(() => {
    resetRecording()
    if (location.key === 'default') {
      navigate('/music/list', { state: { type: 'melting' } })
    } else {
      navigate(-1)
    }
  }, [navigate, resetRecording])

  const handleComplete = useCallback(async () => {
    if (isEnd && !isRecording) {
      const recordedBlob = processRecordedAudio()
      setIsApiModal(true)
      setisLoading(true) // 로딩 시작

      try {
        const response = await songApi.meltingApi(originalSongId, recordedBlob)

        if (response) {
          setModalTitle('멜팅 완료')
          setModalText([
            '멜팅하기가 완료되었습니다.',
            '내가 등록한 곡&앨범 에서 확인 가능합니다.',
          ])
          setIsDialogOpen(true)
        }
      } finally {
        setisLoading(false) // 로딩 끝
      }
    }
  }, [isEnd, isRecording, processRecordedAudio, navigate])

  const startRecording = useCallback(async () => {
    try {
      resetRecording()
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
      streamRef.current = stream
      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        processRecordedAudio()
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      audioPlayerRef.current?.play()
    } catch (err) {
      console.error('Error accessing the microphone', err)
    }
  }, [resetRecording, processRecordedAudio])

  const handleRecordClick = useCallback(() => {
    if (isRecording || isEnd) {
      resetRecording()
    } else {
      startRecording()
    }
  }, [isRecording, isEnd, resetRecording, startRecording])

  const lyricsLines = lyrics.split('\n')

  const handleAudioEnded = useCallback(() => {
    setIsEnd(true)
    stopMicrophoneUsage()
    processRecordedAudio()
  }, [stopMicrophoneUsage, processRecordedAudio])

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
          type="button"
          variant="outline"
          size="icon"
          className="w-20 h-20 bg-[#FFAF25] rounded-full"
          onClick={handleRecordClick}
        >
          {isRecording || isEnd ? (
            <RotateCcw className="w-full h-full p-5 text-white" />
          ) : (
            <Mic className="w-full h-full p-5 text-white" />
          )}
        </Button>
      </div>
      <AudioPlayer
        ref={audioPlayerRef}
        disabled={true}
        audioSrc={audioSrc}
        onEnded={handleAudioEnded}
      />

      {/* {isEnd && recordedAudioUrl && (
        <div className="mt-5">
          <h3 className="text-center text-lg font-bold">녹음된 파일 재생</h3>
          <AudioPlayer
            audioSrc={recordedAudioUrl}
            onEnded={() => console.log('Playback ended')}
          />
        </div>
      )} */}

      <div className="text-center">
        <Button
          type="button"
          className={`w-full rounded-full font-bold py-7 text-white ${
            !isRecording && !isEnd
              ? 'bg-[#A5A5A5]'
              : isEnd
                ? 'bg-[#FFAF25]'
                : 'bg-[#A5A5A5]'
          }`}
          onClick={isEnd && !isRecording ? handleComplete : undefined}
          disabled={isEnd && !isRecording ? false : true}
        >
          완료
        </Button>
        <span className="inline-block pt-3 text-center" onClick={handleCancel}>
          취소
        </span>
      </div>
      {isDialogOpen && (
        <AlertModal
          title={modalTitle}
          messages={modalText}
          isOpen={isDialogOpen}
          onClose={handleCloseModal}
        />
      )}
      {isLoading && <LodingModal isOpen={isLoading} content={'멜팅 중'} />}
    </div>
  )
}
