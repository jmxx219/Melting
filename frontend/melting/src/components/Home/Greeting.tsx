import { useUserInfo } from '@/hooks/useUserInfo'

export default function Greeting() {
  const { data: userInfo, isLoading } = useUserInfo()

  if (isLoading) {
    return <div className="flex text-2xl font-bold">로딩 중...</div>
  }

  // userInfo가 null인지 확인
  if (!userInfo) {
    return (
      <div className="flex text-2xl font-bold">
        회원 정보를 가져올 수 없습니다.
      </div>
    )
  }

  return (
    <div className="flex text-2xl font-bold">
      <div className="text-primary-400">{userInfo.nickname}</div>님, 안녕하세요
    </div>
  )
}
