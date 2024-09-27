import { useState } from 'react'
import SubmitButton from '@/components/Button/SubmitButton'
import ProfileImage from '@/components/Common/ProfileImage'
import NicknameInput from '@/components/Common/NicknameInput'

export default function ProfileEditForm() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [nickname, setNickname] = useState('노원핵주먹')
  const [isFormValid, setIsFormValid] = useState(false)

  const handleSubmit = () => {
    if (isFormValid) {
      // TODO: 회원정보 수정 API 호출
      console.log('Form submitted', { nickname, profileImage })
    }
  }

  const handleFormValidation = (isValid: boolean) => {
    setIsFormValid(isValid)
  }

  return (
    <div className="px-8 py-10 flex flex-col">
      <div>
        <div className="flex justify-center mb-16">
          <ProfileImage
            profileImage={profileImage}
            avatarSize="w-40 h-40"
            userIconSize="w-12 h-12"
            withUpload={true}
            onImageUpload={setProfileImage}
          />
        </div>
        <NicknameInput
          nickname={nickname}
          setNickname={setNickname}
          onValidate={handleFormValidation}
        />
        <SubmitButton
          className={`w-full h-12 rounded-2xl mt-6 text-left ${isFormValid ? 'bg-primary-400 text-white' : 'bg-gray text-black'} `}
          onClick={handleSubmit}
          conditions={[isFormValid]}
          text={'수정하기'}
        ></SubmitButton>
      </div>
    </div>
  )
}
