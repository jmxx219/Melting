import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SubmitButton from '@/components/Button/SubmitButton'
import ProfileImage from '@/components/Common/ProfileImage'
import NicknameInput from '@/components/Common/NicknameInput'
import { useUserInfo } from '@/hooks/useUserInfo'
import { userApi } from '@/apis/userApi'
import { UpdateMemberInfoPayload, MemberUpdateRequestDto } from '@/types/user'
import AlertModal from '@/components/Common/AlertModal.tsx'
import { useQueryClient } from '@tanstack/react-query'

export default function ProfileEditForm() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogMessages, setDialogMessages] = useState<string[]>([])
  const { data: userInfo } = useUserInfo()

  const [profileImage, setProfileImage] = useState<string>(
    userInfo?.profileImageUrl ?? '',
  )
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [nickname, setNickname] = useState<string>(userInfo?.nickname ?? '')

  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const [isProfileImageValid, setIsProfileImageValid] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    if (userInfo) {
      setProfileImage(userInfo.profileImageUrl ?? '')
      setNickname(userInfo.nickname ?? '')
    }
  }, [userInfo])

  useEffect(() => {
    setIsFormValid(isNicknameValid || isProfileImageValid)
  }, [isNicknameValid, isProfileImageValid])

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleNicknameValidation = (isValid: boolean) => {
    setIsNicknameValid(isValid)
  }

  const handleImageUpload = (image: string, file?: File) => {
    setProfileImage(image)
    setProfileImageFile(file ?? null)
    setIsProfileImageValid(true)
  }

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const memberUpdateRequestDto: MemberUpdateRequestDto = {
          nickname: nickname,
        }

        const payload: UpdateMemberInfoPayload = {
          multipartFile: profileImageFile || null,
          memberUpdateRequestDto: memberUpdateRequestDto,
        }

        const response = await userApi.updateMemberInfo(payload)
        queryClient.setQueryData(['userInfo'], (oldData: any) => ({
          ...oldData,
          profileImageUrl: response.profileImageUrl || profileImage,
          nickname: response.nickname || nickname,
        }))

        navigate('/mypage')
      } catch (error) {
        console.error('회원 정보 수정 중 오류 발생:', error)
        setDialogMessages([
          '회원 정보 수정 중 오류가 발생했습니다.',
          '다시 시도해주세요.',
        ])
        setIsDialogOpen(true)
      }
    }
  }

  return (
    <div className="px-5 py-10 flex flex-col">
      <div>
        <div className="flex justify-center mb-16">
          <ProfileImage
            profileImage={profileImage}
            avatarSize="w-40 h-40"
            userIconSize="w-12 h-12"
            withUpload={true}
            onImageUpload={handleImageUpload}
          />
        </div>
        <NicknameInput
          nickname={nickname}
          setNickname={setNickname}
          onValidate={handleNicknameValidation}
          isShowInfo={false}
        />
        <SubmitButton
          className={`w-full h-12 rounded-2xl mt-6 text-left ${isFormValid ? 'bg-primary-400 text-white' : 'bg-gray text-black'} `}
          onClick={handleSubmit}
          conditions={[isFormValid]}
          text={'수정하기'}
        ></SubmitButton>
      </div>
      {isDialogOpen && (
        <AlertModal
          title="회원정보 수정 오류"
          messages={dialogMessages}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  )
}
