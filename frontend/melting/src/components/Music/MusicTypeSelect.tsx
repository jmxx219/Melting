import { BrainCircuit, Mic } from 'lucide-react'
import MusicTypeButton from '@/components/Music/MusicTypeButton'
import { useEffect, useState } from 'react'
import { userApi } from '@/apis/userApi'

type Props = {}

export default function MusicTypeSelect({}: Props) {
  const [coverCnt, setCoverCnt] = useState<number>(0)
  useEffect(() => {
    const fetchInitialSongs = async () => {
      const response = await userApi.getUserCoverCnt()
      console.log(response)

      if (!response.songcounts) {
        setCoverCnt(0)
      } else {
        setCoverCnt(response.songcounts)
      }
    }

    fetchInitialSongs()
  }, [])
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-14">
      <MusicTypeButton
        bgColor="#FFAF25"
        title={'멜팅하기'}
        detail={['원하는 곡을 커버하고', '앨범을 제작해보세요!']}
        footer={`여러분의 목소리를 뽐내주세요`}
        type="melting"
        icon={Mic}
      ></MusicTypeButton>
      <MusicTypeButton
        bgColor="#A5A5A5"
        title={'AI 자동 커버'}
        detail={[
          '사용자의 목소리를 AI가 학습하여',
          '원곡 커버를 자동 생성해요',
        ]}
        isFooter={coverCnt >= 3 ? false : true}
        footer={
          coverCnt >= 3 ? '' : `현재 ${3 - coverCnt}곡의 커버가 더 필요해요`
        }
        type="ai"
        icon={BrainCircuit}
        disable={coverCnt >= 3 ? false : true}
      ></MusicTypeButton>
    </div>
  )
}
