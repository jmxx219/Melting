import { SongPlay } from '@/types/songPlay'
import { Heart } from 'lucide-react'

type Props = {
  songs?: SongPlay[]
}

export default function MusicPlayContent({ songs }: Props) {
  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <img
          src="/api/placeholder/400/400"
          alt="Album cover"
          className="w-full rounded-lg"
        />
      </div>
      <div className="flex items-center mb-4">
        <Heart className="w-6 h-6 text-red-500 mr-2" />
        <span className="text-sm text-gray-600">123</span>
      </div>
      <div className="text-sm text-gray-700 mb-4">
        <p>어쩜 이렇게 하늘은 더 파란건지</p>
        <p>오늘따라 왜 바람은 또 완벽한지</p>
        <p>그냥 모르는척 하나 못들은척</p>
        <p>지워버린척 난 억지 시작할까</p>
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
    </div>
  )
}
