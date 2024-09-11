import LineTitle from '@/components/music/LineTitle'
import MusicTypeButton from '@/components/music/MusicTypeButton'
export default function MusciMain() {
  return (
    <div className="w-screen px-8">
      <LineTitle titles={['곡 제작 유형을', '선택해주세요']}></LineTitle>
      <MusicTypeButton bgColor="#FFAF25"></MusicTypeButton>
    </div>
  )
}
