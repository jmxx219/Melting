import { Avatar, AvatarImage } from '../../ui/avatar'

type AlbumUserProfileProps = {
  profileImage: string
  nickname: string
}

export default function AlbumUserProfile({
  profileImage,
  nickname,
}: AlbumUserProfileProps) {
  return (
    <div className="flex items-center mt-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={profileImage} />
      </Avatar>
      <div className="flex-grow px-2">
        <h3 className="text-base font-semibold">{nickname}</h3>
      </div>
    </div>
  )
}
