import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowRight, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function MyPageSelect() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleRegisteredSongs = () => {
    navigate('/mypage/my-albums') // 내가 등록한 한 곡 & 앨범 페이지 경로
  }

  const handleLikedSongs = () => {
    navigate('/mypage/liked-albums') // 좋아요 한 곡 & 앨범 페이지 경로
  }

  const handleProfileEdit = () => {
    navigate('/mypage/profile/edit')
  }

  const handleLogout = () => {
    // 로그아웃
  }

  const handleAccountDelete = () => {
    // 회원 탈퇴
  }

  return (
    <div className="px-4 py-10 flex flex-col">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-32 h-32">
          <AvatarImage src={profileImage || ''} alt="Profile" />
          <AvatarFallback>
            <User className="w-12 h-12 text-gray-400" />
          </AvatarFallback>
        </Avatar>
        <div className="text-xl font-bold mt-6">노원핵주먹</div>
      </div>

      <div className="flex flex-col w-full mb-8">
        <Button
          variant={'outline'}
          className="w-full h-12 rounded-2xl mt-4 text-left border-2 border-primary-400 text-black"
          onClick={handleRegisteredSongs}
          >
          <div className="flex justify-between items-center w-full px-2">
            <span>내가 등록한 한 곡 & 앨범</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </Button>
        <Button
          className="w-full h-12 rounded-2xl mt-4 text-left bg-primary-400 text-white"
          onClick={handleLikedSongs}
          >
          <div className="flex justify-between items-center w-full px-2">
            <span>좋아요 한 곡 & 앨범</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </Button>
      </div>
      
      <div className="flex flex-col w-full">
        <Button
          className="w-full justify-between h-12 rounded-2xl text-primary-400 bg-transparent text-left" 
          onClick={handleProfileEdit}
        >
          회원 정보 수정
        </Button>
        <hr className="w-11/12 border-gray-300 my-1 mx-auto" />
        <Button
          className="w-full justify-between h-12 rounded-2xl text-primary-400 bg-transparent text-left"
          onClick={handleLogout}
        >
          로그아웃
        </Button>
        <hr className="w-11/12 border-gray-300 my-1 mx-auto" />
        <Button
          className="w-full justify-between h-12 rounded-2xl text-gray-400 bg-transparent text-left"
          onClick={handleAccountDelete}
        >
          회원 탈퇴
        </Button>
      </div>
    </div>


  )
}
