import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'

interface NicknameInputProps {
  nickname: string
  setNickname: (value: string) => void
  onValidate: (isValid: boolean) => void
}

const isValidNickname = (nickname: string): boolean => {
  const regex = /^[가-힣a-zA-Z0-9]{2,20}$/
  return regex.test(nickname)
}

const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
  // TODO: 닉네임 중복 체크 API 호출
  console.log(nickname)
  return new Promise((resolve) => setTimeout(() => resolve(false), 1000))
}

export default function NicknameInput({
  nickname,
  setNickname,
  onValidate,
}: NicknameInputProps) {
  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false)

  useEffect(() => {
    const validateNickname = async () => {
      const nicknameValid = isValidNickname(nickname)
      const nicknameDuplicate = nicknameValid
        ? await checkNicknameDuplicate(nickname)
        : true

      setIsNicknameValid(nicknameValid)
      setIsNicknameDuplicate(nicknameDuplicate)

      onValidate(nicknameValid && !nicknameDuplicate)
    }

    validateNickname()
  }, [nickname, onValidate])

  return (
    <div className="space-y-6 mb-14">
      <div className="relative">
        <Input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className={`mt-4 border-b-2 ${
            !isNicknameValid && nickname ? 'border-b-status-warning' : ''
          } ${nickname ? 'text-black' : ''} ${
            isNicknameValid ? 'border-b-primary-400' : ''
          }`}
          maxLength={20}
          autoComplete="off"
          spellCheck="false"
        />
        <div className="h-5">
          <span
            className={`absolute right-2 bottom-0 text-xs ${
              nickname.length <= 20 && nickname.length > 0
                ? 'text-primary-400'
                : 'text-gray'
            } ${nickname.length > 20 ? 'text-status-warning' : ''} `}
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
  )
}
