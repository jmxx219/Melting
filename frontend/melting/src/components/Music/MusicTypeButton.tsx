import { CoverType } from '@/types/constType'
import { ArrowUpRight, LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface TypeBtnProps {
  bgColor: string
  title: string
  detail: string[]
  isFooter?: boolean
  footer?: string
  type: CoverType
  icon: LucideIcon
  disable?: boolean
}

export default function MusicTypeButton({
  bgColor,
  title,
  detail,
  isFooter = false,
  footer,
  type,
  icon,
  disable = false,
}: TypeBtnProps) {
  const navigate = useNavigate()
  const Icon = icon

  const clickEvent: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/music/list', { state: { type: type } })
  }
  return (
    <button
      type="button"
      className="w-full px-5 py-7 flex items-center justify-center text-black font-bold rounded-lg transition-colors "
      style={{ backgroundColor: bgColor }}
      onClick={clickEvent}
      disabled={disable}
    >
      <div className="flex w-full flex-col items-start text-white me-3">
        <div className="text-2xl mb-5 font-semibold flex justify-center items-center">
          {title}
          <div className="ms-2">
            <Icon />
          </div>
        </div>
        <div className="mb-5">
          {detail.map((text, index) => (
            <div className="font-thin text-start text-sm" key={index}>
              {text}
            </div>
          ))}
        </div>
        <div className="font-thin text-sm">{isFooter && footer}</div>
      </div>
      <div>
        <ArrowUpRight className="text-white" />
      </div>
    </button>
  )
}
