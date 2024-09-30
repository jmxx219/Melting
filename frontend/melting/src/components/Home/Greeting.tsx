import { useUserInfo } from '@/hooks/useUserInfo'

export default function Greeting() {
  const { data: userInfo } = useUserInfo()
  if (!userInfo || !userInfo.data) {
    return <div className="flex text-2xl font-bold">로딩 중...</div>
  }

  return (
    <div className="flex text-2xl font-bold">
      <div className="text-primary-400">{userInfo.data.nickname}</div>님,
      안녕하세요
    </div>
  )
}
