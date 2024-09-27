import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { User, Camera } from 'lucide-react'

interface ProfileImageProps {
  profileImage?: string | null
  avatarSize: string
  userIconSize: string
  withUpload?: boolean
  onImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ProfileImage({
  profileImage,
  avatarSize,
  userIconSize,
  withUpload = false,
  onImageUpload,
}: ProfileImageProps) {
  return (
    <div className="relative flex flex-col items-center">
      <Avatar className={avatarSize}>
        <AvatarImage src={profileImage ?? ''} alt="Profile" />
        <AvatarFallback>
          <User className={userIconSize + ' text-gray-400'} />
        </AvatarFallback>
      </Avatar>
      {withUpload && (
        <>
          <label
            htmlFor="profile-upload"
            className="absolute bottom-2 right-2 bg-white border-b border-gray rounded-full p-2 cursor-pointer"
          >
            <Camera className="w-6 h-6 text-black" />
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
            autoComplete="off"
            spellCheck="false"
          />
        </>
      )}
    </div>
  )
}
