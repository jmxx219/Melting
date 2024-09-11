// src/components/auth/LoginForm.tsx
export default function LoginForm() {
  return (
    <div className="flex flex-col space-y-4 w-[350px]">
      <button className="w-full py-3 flex items-center justify-center relative bg-[#FEE500] text-black font-bold rounded-full transition-colors h-14">
        <img src="/images/logo/kakao_logo.png" alt="카카오 로고" className="absolute left-4 w-4 h-4" />
        <p className="ml-6">카카오 로그인</p>
      </button>
      <button className="w-full py-3 flex items-center justify-center relative bg-[#EEEEEE] text-black font-bold rounded-full transition-colors h-14">
        <img src="/images/logo/google_logo.png" alt="구글 로고" className="absolute left-4 w-4 h-4" />
        <p className="ml-6">구글 로그인</p>
      </button>
      <button type="button" className="text-sm text-center">
        로그인 없이 진행할게요
      </button>
    </div>
  )
}
