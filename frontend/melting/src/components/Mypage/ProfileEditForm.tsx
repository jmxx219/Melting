import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import SubmitButton from '@/components/Button/SubmitButton'
import { Input } from '@/components/ui/input'
import { ArrowRight, Camera, User } from 'lucide-react'

const isValidNickname = (nickname: string): boolean => {
  const regex = /^[가-힣a-zA-Z0-9]{2,20}$/
  return regex.test(nickname)
}

// 닉네임 중복 체크 함수 (실제로는 API 호출이 필요)
const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
  // 여기에 실제 API 호출 로직 구현
  console.log(nickname)
  return new Promise((resolve) => setTimeout(() => resolve(false), 1000))
}

export default function SignupForm() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [nickname, setNickname] = useState('노원핵주먹')
  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const validateForm = async () => {
      const nicknameValid = isValidNickname(nickname)
      const nicknameDuplicate = nicknameValid
        ? await checkNicknameDuplicate(nickname)
        : true

      setIsNicknameValid(nicknameValid)
      setIsNicknameDuplicate(nicknameDuplicate)
      setIsFormValid(nicknameValid && !nicknameDuplicate)
    }

    validateForm()
  }, [nickname])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (isFormValid) {
      // 여기에 회원정보 수정
      console.log('Form submitted', { nickname, profileImage })
    }
  }

  return (
    <div className="px-8 py-10 flex flex-col">
      <div>
        <div className="flex justify-center mb-16">
          <div className="relative">
            <Avatar className="w-40 h-40 ">
              <AvatarImage src={profileImage || ''} alt="Profile" />
              <AvatarFallback>
                <User className="w-12 h-12 text-gray-400" />
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="profile-upload"
              className="absolute bottom-2 right-2 bg-white border-b border-gray rounded-full p-2 cursor-pointer"
            >
              <Camera className="w-6 h-6 text-black" />
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="space-y-6 mb-14">
          <div className="relative">
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={`mt-4 border-b-2 ${!isNicknameValid && nickname ? 'border-b-status-warning' : ''} ${nickname ? 'text-black' : ''} ${isNicknameValid ? 'border-b-primary-400' : ''}`}
              maxLength={20}
            />
            <div className="h-5">
              <span
                className={`absolute right-2 bottom-0 text-xs ${nickname.length <= 20 && nickname.length > 0 ? 'text-primary-400' : 'text-gray'} ${nickname.length > 20 ? 'text-status-warning' : ''} `}
              >
                {nickname.length}/20
              </span>
              {!isNicknameValid && nickname && (
                <p className="text-status-warning text-xs mt-1">
                  닉네임은 2-20자의 한글, 영문, 숫자만 가능합니다.
                </p>
              )}
              {isNicknameDuplicate && (
                <p className="text-status-warning text-xs mt-1">
                  이미 사용 중인 닉네임입니다.
                </p>
              )}
            </div>
          </div>

          <div className="text-xs text-gray">
            닉네임은 영어, 한글, 숫자 포함 20글자까지 가능해요
          </div>
        </div>
        <SubmitButton
          className={`w-full h-12 rounded-2xl mt-6 text-left ${isFormValid ? 'bg-primary-400 text-white' : 'bg-gray text-black'} `}
          onClick={handleSubmit}
          conditions={[!isFormValid]}
          text={'수정하기'}
        >
          {/* <div className="flex justify-between items-center w-full px-2">
            <span>수정하기</span>
            <ArrowRight className="w-5 h-5" />
          </div> */}
        </SubmitButton>
      </div>
    </div>
  )
}
