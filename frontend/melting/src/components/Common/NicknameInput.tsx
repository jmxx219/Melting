import { Input } from '@/components/ui/input'
import { useState, useEffect, useCallback } from 'react'
import { userApi } from '@/apis/userApi.ts'

interface NicknameInputProps {
  nickname: string
  setNickname: (value: string) => void
  onValidate: (isValid: boolean) => void
  isShowInfo: boolean
}

const isValidNickname = (nickname: string): boolean => {
  const regex = /^[가-힣a-zA-Z0-9]{2,20}$/
  return regex.test(nickname)
}

export default function NicknameInput({
  nickname,
  setNickname,
  onValidate,
  isShowInfo,
}: NicknameInputProps) {
  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false)

  const checkNickname = useCallback(async (value: string) => {
    if (!isValidNickname(value)) {
      setIsNicknameDuplicate(false)
      return true // 닉네임이 유효하지 않으면 바로 true 반환
    }

    try {
      const response = await userApi.validateNickname(value)
      const isDuplicate = !response.data // API 응답이 false면 중복
      setIsNicknameDuplicate(isDuplicate)
      return isDuplicate
    } catch (error) {
      console.error('닉네임 검증 중 오류 발생:', error)
      setIsNicknameDuplicate(true) // 오류 발생 시 중복으로 간주
      return true
    }
  }, [])

  useEffect(() => {
    const validateNickname = async () => {
      const nicknameValid = isValidNickname(nickname)
      setIsNicknameValid(nicknameValid)

      if (nicknameValid) {
        const nicknameDuplicate = await checkNickname(nickname)
        setIsNicknameDuplicate(nicknameDuplicate)
        // 닉네임이 유효하고 중복이 아닐 경우에만 true
        onValidate(nicknameValid && !nicknameDuplicate)
      } else {
        setIsNicknameDuplicate(false)
        onValidate(false)
      }
    }

    const timer = setTimeout(() => {
      if (nickname) {
        validateNickname()
      }
    }, 300) // 300ms 디바운스

    return () => clearTimeout(timer)
  }, [nickname, checkNickname, onValidate])

  return (
    <>
      <div className="relative">
        <Input
          placeholder="닉네임을 입력해주세요"
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
          {!isNicknameValid && nickname.length > 0 && (
            <p className="text-status-warning text-xs mt-1">
              닉네임은 2-20자의 한글, 영문, 숫자만 가능합니다.
            </p>
          )}
          {isNicknameValid && isNicknameDuplicate && (
            <p className="text-status-warning text-xs mt-1">
              이미 사용 중인 닉네임입니다.
            </p>
          )}
        </div>
      </div>
      {isShowInfo && (
        <div className="text-xs text-gray">
          닉네임은 영어, 한글, 숫자 포함 20글자까지 가능해요
        </div>
      )}
    </>
  )
}
