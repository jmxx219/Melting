import { ArrowUpRight, Mic } from 'lucide-react'

interface TypeBtnProps {
  bgColor: string
  title: string
  detail: string[]
  footer: string
}

export default function MusicTypeButton(props: TypeBtnProps) {
  const clickEvent: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log(event)
  }
  return (
    <button
      className="w-full px-3 py-5 flex items-center justify-center text-black font-bold rounded-lg transition-colors "
      style={{ backgroundColor: props.bgColor }}
      onClick={clickEvent}
    >
      <div className="flex w-full flex-col items-start text-white me-3">
        <div className="text-1xl mb-3 font-semibold flex">
          {props.title}
          <Mic />
        </div>
        <div className="mb-3">
          {props.detail.map((text, index) => (
            <div className="font-thin text-start text-sm" key={index}>
              {text}
            </div>
          ))}
        </div>
        <div className="font-thin text-sm">{props.footer}</div>
      </div>
      <div>
        <ArrowUpRight />
      </div>
    </button>
  )
}
