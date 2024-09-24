import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  title: string
  buttonArea: ReactNode
  move?: () => void
}

export default function DefaultHeader({ title, buttonArea, move }: HeaderProps) {
  const navigate = useNavigate()

  const handleBackClick = () => {
    if (move) {
      move()
    } else {
      navigate(-1)
    }
  }
  return (
    <div className="flex items-center justify-center relative w-full h-16">
      <div onClick={handleBackClick} className="absolute left-1">
        {buttonArea}
      </div>
      <div className="font-bold text-xl text-[#FFAF25]">{title}</div>
    </div>
  )
}
