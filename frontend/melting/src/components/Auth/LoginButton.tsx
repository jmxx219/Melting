import login from '@/apis/authApi.ts'
import OAuthButton from './OAuthButton'

export default function LoginForm() {
  const handleKakaoLogin = async () => {
    console.log('카카오 로그인!')
    await login('kakao')
  }

  const handleGoogleLogin = async () => {
    // window.location.href = '/oauth2/authorization/google';
    console.log('구글 로그인!')
    await login('google')
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
      {/*<button type="button" className="text-sm text-center" onClick={handleGuestLogin}>*/}
      {/*  로그인 없이 진행할게요*/}
      {/*</button>*/}
    </div>
  )
}
