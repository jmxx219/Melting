import { BrainCircuit, Mic } from 'lucide-react'
import MusicTypeButton from '@/components/Music/MusicTypeButton'
import { useEffect, useState } from 'react'
import { userApi } from '@/apis/userApi'

type Props = {}

export default function MusicTypeSelect({}: Props) {
  const [coverCnt, setCoverCnt] = useState<number>(0)
  const [isEnable, setIsEnable] = useState<boolean>(false)
  const [footerText, setFooterText] = useState<string>('')
  useEffect(() => {
    const fetchInitialSongs = async () => {
      const { aiCoverEnabled, songCounts } = await userApi.getUserCoverCnt()

      setCoverCnt(songCounts)
      setIsEnable(aiCoverEnabled)
      if (songCounts < 3) {
        setFooterText(`현재 ${3 - songCounts}곡의 커버가 더 필요해요`)
      } else if (songCounts >= 3 && !aiCoverEnabled) {
        setFooterText('현재 사용자 음성 모델을 생성중입니다')
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
        bgColor={isEnable && coverCnt >= 3 ? '#FFAF25' : '#A5A5A5'}
        title={'AI 자동 커버'}
        detail={[
          '사용자의 목소리를 AI가 학습하여',
          '원곡 커버를 자동 생성해요',
        ]}
        isFooter={isEnable && coverCnt >= 3 ? false : true}
        footer={footerText}
        type="ai"
        icon={BrainCircuit}
        disable={!(isEnable && coverCnt >= 3)}
      ></MusicTypeButton>
    </div>
  )
}
