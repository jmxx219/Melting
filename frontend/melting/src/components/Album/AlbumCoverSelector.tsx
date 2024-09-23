import { useState } from 'react'
import { Image, Loader } from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import AI from '../icon/AI'

interface ImageInfo {
  id: string
  url: string
  description: string
  type: 'user' | 'ai' | 'default'
}

interface AlbumCoverSelectorProps {
  onSelectCover: (cover: string) => void
}

export default function AlbumCoverSelector({
  onSelectCover,
}: AlbumCoverSelectorProps) {
  const [images, setImages] = useState<ImageInfo[]>([
    {
      id: 'default1',
      url: 'https://d35fpwscei7sb8.cloudfront.net/image/original_album_cover/1.jpg',
      description: '기본 이미지 1',
      type: 'default',
    },
    {
      id: 'default2',
      url: 'https://d35fpwscei7sb8.cloudfront.net/image/original_album_cover/2.jpg',
      description: '기본 이미지 2',
      type: 'default',
    },
    {
      id: 'default3',
      url: 'https://d35fpwscei7sb8.cloudfront.net/image/original_album_cover/3.jpg',
      description: '기본 이미지 3',
      type: 'default',
    },
  ])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage: ImageInfo = {
          id: `user_${Date.now()}`,
          url: reader.result as string,
          description: '사용자 등록 이미지',
          type: 'user',
        }
        setImages((prevImages) => [newImage, ...prevImages])
        setSelectedImage(newImage.url)
        onSelectCover(newImage.url)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAiGeneration = async () => {
    if (images.some((img) => img.type === 'ai')) return

    setIsGeneratingAi(true)
    // AI 이미지 생성 로직 (예: API 호출)
    // 여기서는 setTimeout으로 시뮬레이션
    setTimeout(() => {
      const newImage: ImageInfo = {
        id: `ai_${Date.now()}`,
        url: 'https://d35fpwscei7sb8.cloudfront.net/image/original_album_cover/4.jpg',
        description: 'AI 생성 이미지',
        type: 'ai',
      }
      setImages((prevImages) => [newImage, ...prevImages])
      setSelectedImage(newImage.url)
      onSelectCover(newImage.url)
      setIsGeneratingAi(false)
    }, 3000)
  }

  const handleImageSelect = (image: ImageInfo) => {
    setSelectedImage(image.url)
    onSelectCover(image.url)
  }

  return (
    <div className="my-4 space-y-4">
      <div className="flex flex-col">
        <div
          className="flex justify-between items-center relative border-b-2 pb-3 px-2"
          onClick={() => document.getElementById('imageUpload')?.click()}
        >
          <div>
            <span className="text-gray-400">이미지 첨부하기</span>
          </div>
          <Image
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${images.some((img) => img.type === 'user') ? 'text-primary-400' : 'text-gray-400'}`}
          />
        </div>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <div
          className="flex justify-between items-center relative border-b-2 pb-2 px-2 mt-4 mr-1"
          onClick={handleAiGeneration}
        >
          <div>
            <span className="text-gray-400">AI 이미지 자동 생성</span>
          </div>
          <div
            className={`${images.some((img) => img.type === 'ai') ? 'text-primary-400' : 'text-gray-400'}`}
          >
            <AI
              width={22}
              height={22}
              fill={
                images.some((img) => img.type === 'ai') ? '#ffaf25' : '#A5A5A5'
              }
            />
          </div>
        </div>
      </div>

      {isGeneratingAi && (
        <div className="flex items-center text-primary-500">
          <Loader className="animate-spin mr-2" />
          AI 이미지 자동 생성 중...
        </div>
      )}

      <div className="bg-gray-100 p-3 rounded-xl">
        <ScrollArea className="w-full">
          <div className="flex space-x-4 p-1 mb-2">
            {images.map((image) => (
              <div
                key={image.id}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div
                  className={`w-32 h-32 relative cursor-pointer rounded-xl mb-2 ${
                    selectedImage === image.url ? 'ring-4 ring-primary-400' : ''
                  }`}
                  onClick={() => handleImageSelect(image)}
                >
                  <img
                    src={image.url}
                    alt={image.description}
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
                <span className="text-center text-gray-500 text-sm w-32">
                  {image.description}
                </span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="text-primary-500 text-sm">
        <p>※ 앨범 이미지를 하나 선택해주세요</p>
        <p>※ AI 이미지 자동 생성은 곡의 가사와 해시태그로 생성됩니다</p>
      </div>
    </div>
  )
}
