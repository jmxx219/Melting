interface OAuthButtonProps {
  imageName: string
  buttonText: string
  bgColor: string
  onClick: () => void // 로그인 요청을 처리할 함수
}

export default function OAuthButton({ imageName, buttonText, bgColor, onClick }: OAuthButtonProps) {
  return (
    <button
      type="button"
      className={`w-full py-3 flex items-center justify-center relative font-bold rounded-full transition-colors h-14 ${bgColor}`}
      onClick={onClick}
    >
      <img src={`/images/logo/${imageName}`} alt={`${buttonText} 로고`} className="absolute left-4 w-4 h-4" />
      <p className="ml-6">{buttonText}</p>
    </button>
  )
}
