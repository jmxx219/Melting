import { Input } from '@/components/ui/input'
import { useState, useEffect, useCallback } from 'react'
import { validateNickname } from '@/apis/userApi.ts'

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
    if (isValidNickname(value)) {
      try {
        const response = await validateNickname(value)
        setIsNicknameDuplicate(!response.data) // API 응답이 false면 중복
        setIsNicknameValid(response.data ?? false)
        return !response.data // true면 중복이 아니고 false면 중복
      } catch (error) {
        console.error('닉네임 검증 중 오류 발생:', error)
        setIsNicknameDuplicate(true)
        setIsNicknameValid(false)
        return true
      }
    } else {
      setIsNicknameValid(false)
      setIsNicknameDuplicate(false)
      return true
    }
  }, [])

  useEffect(() => {
    const validateNickname = async () => {
      const nicknameValid = isValidNickname(nickname)
      let nicknameDuplicate = true

      if (nicknameValid) {
        nicknameDuplicate = await checkNickname(nickname)
      }

      setIsNicknameValid(nicknameValid)
      setIsNicknameDuplicate(nicknameDuplicate)

      // nickname이 유효하고 중복이 아닐 경우에만 true
      onValidate(nicknameValid && !nicknameDuplicate)
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
      {isShowInfo && (
        <div className="text-xs text-gray">
          닉네임은 영어, 한글, 숫자 포함 20글자까지 가능해요
        </div>
      )}
    </>
  )
}
