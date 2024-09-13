import { ReactNode } from 'react'

type HeaderProps = {
  title: string
  buttonArea: ReactNode
}

export default function DefaultHeader({ title, buttonArea }: HeaderProps) {
  return (
    <div className="flex w-full">
      <div className="w-1/4 flex justify-start">{buttonArea}</div>
      <div className="w-3/4 flex justify-center text-xl">{title}</div>
    </div>
  )
}
