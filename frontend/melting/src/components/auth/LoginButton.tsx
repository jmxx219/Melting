import { useNavigate } from 'react-router-dom'

import OAuthButton from './OAuthButton'

export default function LoginForm() {
  const navigate = useNavigate()

  const handleKakaoLogin = () => {
    // window.location.href = '/oauth2/authorization/kakao';
    console.log('카카오 로그인!')
  }

  const handleGoogleLogin = () => {
    // window.location.href = '/oauth2/authorization/google';
    console.log('구글 로그인!')
  }

  // 비회원일 경우 바로 메인 화면으로 이동
  const handleGuestLogin = () => {
    // 비회원 상태 저장, 비회원 권한 부여 등을 처리
    // 로컬스토리지나 상태 관리 라이브러리로 권한 관리 가능
    localStorage.setItem('role', 'guest')
    navigate('/main') // 메인 화면으로 이동
  }

  return (
    <div className="flex flex-col space-y-4 w-[350px]">
      <OAuthButton
        imageName="kakao_logo.png"
        buttonText="카카오 로그인"
        bgColor="bg-[#FEE500]"
        onClick={handleKakaoLogin}
      />
      <OAuthButton
        imageName="google_logo.png"
        buttonText="구글 로그인"
        bgColor="bg-[#EEEEEE]"
        onClick={handleGoogleLogin}
      />
      <button type="button" className="text-sm text-center" onClick={handleGuestLogin}>
        로그인 없이 진행할게요
      </button>
    </div>
  )
}
