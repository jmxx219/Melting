import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  title: string
  buttonArea: ReactNode
  move?: () => void
  disableBack?: boolean
}

export default function DefaultHeader({
  title,
  buttonArea,
  move,
  disableBack,
}: HeaderProps) {
  const navigate = useNavigate()

  const handleBackClick = () => {
    if (disableBack) {
      return // 뒤로가기 비활성화 시 아무 동작도 하지 않음
    }
    if (move) {
      move()
    } else {
      navigate(-1)
    }
  }
  return (
    <div className="flex items-center justify-center relative w-full h-10">
      <div
        onClick={handleBackClick}
        className={`absolute left-1 ${disableBack ? '' : 'cursor-pointer'}`}
      >
        {buttonArea}
      </div>
      <div className="font-bold text-xl text-[#FFAF25]">{title}</div>
    </div>
  )
}
