import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Intro() {
  const navigate = useNavigate()
  const [isRotating, setIsRotating] = useState(false)

  const handleClick = () => {
    setIsRotating(true)
    setTimeout(() => {
      setIsRotating(false)
      navigate('/album/create')
    }, 1000) // 1초 동안 애니메이션 실행 후 이동
  }

  return (
    <div className="flex flex-col justify-center text-center my-8">
      <div
        className={`flex justify-center ${isRotating ? 'rotate-animation' : ''}`}
        onClick={handleClick}
      >
        <div className="w-[250px] h-[200px] rounded-lg overflow-hidden">
          <img
            src="/images/record.png"
            alt="레코드 판"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <p className="text-xl mt-2">나만의 앨범 발매하기</p>
    </div>
  )
}
