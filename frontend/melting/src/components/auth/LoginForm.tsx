export default function LoginForm() {
  return (
    <div className="flex flex-col w-full max-w-md">
      <button className="flex flex-row items-center w-full py-1 px-2 font-bold text-black bg-[#FEE500] rounded-full">
        <img src="/images/logo/kakao_logo.png" alt="" width={18} className="m-3" />
        <p className="flex ml-16 items-center text-center">카카오 로그인</p>
      </button>
      <button className="flex flex-row items-center w-full py-1 px-2 font-bold text-black bg-[#EEEEEE] rounded-full">
        <img src="/images/logo/google_logo.png" alt="" width={40} className="" />
        <p className="flex ml-16 items-center text-center">구글 로그인</p>
      </button>
      <button type="button" className="text-sm text-center">
        로그인 없이 진행할게요
      </button>
    </div>
  )
}
