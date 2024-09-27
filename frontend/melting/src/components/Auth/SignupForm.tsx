import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowRight, X } from 'lucide-react'
import {
  InitMemberInfoPayload,
  MemberInitRequestDto,
} from '@/typeApis/members/data-contracts.ts'
import { validateNickname, initMemberInfo } from '@/apis/userApi.ts'
import ProfileImage from '@/components/Common/ProfileImage.tsx'
import NicknameInput from '@/components/Common/NicknameInput.tsx'
import AlertModal from '@/components/Common/AlertModal.tsx'

const isValidNickname = (nickname: string): boolean => {
  const regex = /^[가-힣a-zA-Z0-9]{2,20}$/
  return regex.test(nickname)
}

export default function SignupForm() {
  const navigate = useNavigate()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [nickname, setNickname] = useState('')
  const [gender, setGender] = useState<string | null>(null)
  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const checkNickname = useCallback(async (value: string) => {
    if (isValidNickname(value)) {
      try {
        const response = await validateNickname(value)
        console.log(nickname)
        setIsNicknameDuplicate(!response.data) // API 응답이 false면 중복
        setIsNicknameValid(response.data ?? false)
      } catch (error) {
        console.error('닉네임 검증 중 오류 발생:', error)
        setIsNicknameDuplicate(true)
        setIsNicknameValid(false)
      }
    } else {
      setIsNicknameValid(false)
      setIsNicknameDuplicate(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (nickname) {
        checkNickname(nickname)
      }
    }, 300) // 300ms 디바운스

    return () => clearTimeout(timer)
  }, [nickname, checkNickname])

  useEffect(() => {
    setIsFormValid(isNicknameValid && !isNicknameDuplicate && !!gender)
  }, [isNicknameValid, isNicknameDuplicate, gender])

  const handleImageUpload = (image: string, file?: File) => {
    setProfileImage(image) // base64 이미지 저장
    setProfileImageFile(file ?? null) // 파일 객체 저장
  }

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const memberInitRequestDto: MemberInitRequestDto = {
          nick_name: nickname,
          gender: gender as 'MALE' | 'FEMALE',
        }

        const payload: InitMemberInfoPayload = {
          multipartFile: profileImageFile || undefined,
          memberInitRequestDto: memberInitRequestDto,
        }

        const response = await initMemberInfo(payload)
        console.log('회원 정보 초기화 성공:', response)
        navigate('/main')
      } catch (error) {
        console.error('회원 정보 초기화 중 오류 발생:', error)
        setDialogMessage(
          '회원 정보 초기화 중 오류가 발생했습니다. 다시 시도해주세요.',
        )
        setIsDialogOpen(true)
      }
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
          <ProfileImage
            userIconSize={'w-12 h-12'}
            avatarSize={'w-40 h-40'}
            profileImage={profileImage}
            withUpload={true}
            onImageUpload={handleImageUpload}
          />
        </div>
        <div className="space-y-6 mb-14">
          <NicknameInput
            nickname={nickname}
            setNickname={setNickname}
            onValidate={(isValid) => setIsFormValid(isValid && !!gender)}
            isShowInfo={false}
          />

          <Select onValueChange={setGender}>
            <SelectTrigger
              className={`w-full mt-10 ${gender ? 'text-black border-b-primary-400' : ''}`}
            >
              <SelectValue placeholder="성별을 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">남자</SelectItem>
              <SelectItem value="FEMALE">여자</SelectItem>
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
      {isDialogOpen && (
        <AlertModal
          title={'회원가입 오류'}
          description={dialogMessage}
          triggerText={<X size={22} className="text-primary-400" />}
          triggerClassName="ml-4"
        />
      )}
    </div>
  )
}
