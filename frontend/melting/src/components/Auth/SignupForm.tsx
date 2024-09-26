import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowRight, Camera, User } from 'lucide-react'
import { validateNickname } from '@/apis/userApi.ts'

const isValidNickname = (nickname: string): boolean => {
  const regex = /^[가-힣a-zA-Z0-9]{2,20}$/
  return regex.test(nickname)
}

// 닉네임 중복 체크 함수 (실제로는 API 호출이 필요)
const checkNicknameDuplicate = async (nickname: string) => {
  // 여기에 실제 API 호출 로직 구현
  console.log(nickname)
  const response = await validateNickname(nickname)
  console.log(response)
  // return response.body
}

export default function SignupForm() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [nickname, setNickname] = useState('')
  const [gender, setGender] = useState<string | null>(null)
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
      setIsNicknameDuplicate(true)
      setIsFormValid(nicknameValid && !nicknameDuplicate && !!gender)
    }

    validateForm()
  }, [nickname, gender])

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
      // 여기에 로그인 또는 회원가입 로직 구현
      console.log('Form submitted', { nickname, gender, profileImage })
    }
  }

  return (
    <div className="px-8 py-10 flex flex-col">
      <div className="flex flex-col mb-16">
        <div className="text-2xl font-bold">정보를</div>
        <div className="text-2xl font-bold mb-2">입력해주세요</div>
        <div className="text-sm text-gray">
          닉네임은 영어, 한글, 숫자 포함 20글자까지 가능해요
        </div>
      </div>
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
              placeholder="닉네임을 입력해주세요"
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

          <Select onValueChange={setGender}>
            <SelectTrigger
              className={`w-full mt-10 ${gender ? 'text-black border-b-primary-400' : ''}`}
            >
              <SelectValue placeholder="성별을 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">남자</SelectItem>
              <SelectItem value="female">여자</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className={`w-full h-14 rounded-2xl mt-6 text-left ${isFormValid ? 'bg-primary-400 text-white' : 'bg-gray text-black'} `}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          <div className="flex justify-between items-center w-full px-4">
            <span>시작하기</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </Button>
      </div>
    </div>
  )
}
