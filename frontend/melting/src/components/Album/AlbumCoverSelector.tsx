import { useState } from 'react'
import { Image, Loader } from 'lucide-react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import AI from '../Icon/AI'
import { useAlbumContext } from '@/contexts/AlbumContext'
import { urlToFile } from '@/utils/fileUtil.ts'
import { base64ToFile, base64ToUrl } from '@/utils/base64Util'
import { albumApi } from '@/apis/albumApi.ts'
import { ImageInfo } from '@/types/album.ts'
import ConfirmDialog from '@/components/Common/ConfirmDialog.tsx'

export default function AlbumCoverSelector() {
  const {
    images,
    selectedSongs,
    selectedCover,
    setImages,
    setSelectedCover,
    setSelectedCoverFile,
  } = useAlbumContext()
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)
  const canGenerateAi =
    selectedSongs.length > 0 && !images.some((img) => img.type === 'ai')

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage: ImageInfo = {
          id: `user_${Date.now()}`,
          url: reader.result as string,
          file,
          description: '사용자 등록 이미지',
          type: 'user',
        }
        setImages((prevImages) => [newImage, ...prevImages])
        setSelectedCover(newImage.url)
        setSelectedCoverFile(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAiGeneration = async () => {
    if (images.some((img) => img.type === 'ai')) return

    setIsGeneratingAi(true)
    try {
      // AI 커버 이미지 생성 API 호출
      const response = await albumApi.createAiAlbumCoverImage({
        songs: selectedSongs.map((song) => song.songId),
      })

      console.log(
        'Server response (first 100 characters):',
        response.substring(0, 100),
      )

      const file = base64ToFile(response, 'cover.jpg', 'image/jpeg')
      setSelectedCoverFile(file)

      const imageUrl = base64ToUrl(response, 'image/jpeg')
      setSelectedCover(imageUrl)

      if (imageUrl) {
        const newImage: ImageInfo = {
          id: `ai_${Date.now()}`,
          url: imageUrl,
          file: file,
          description: 'AI 생성 이미지',
          type: 'ai',
        }
        setImages((prevImages: ImageInfo[]) => [newImage, ...prevImages])
      }
    } catch (error) {
      console.error('AI 커버 이미지 생성 중 오류 발생:', error)
    } finally {
      setIsGeneratingAi(false)
    }
  }

  const handleImageSelect = async (image: ImageInfo) => {
    setSelectedCover(image.url)

    if (image.type === 'default') {
      // 기본 이미지의 경우 URL을 File 객체로 변환
      const file = await urlToFile(image.url, `${image.id}.jpg`, 'image/jpeg')
      setSelectedCoverFile(file)
    } else {
      // 사용자 등록 이미지나 AI 이미지는 이미 File 객체임
      setSelectedCoverFile(new File([], 'default-image.jpg')) // AI 이미지 처리
    }
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
        <ConfirmDialog
          title="AI 앨범 커버 이미지 생성"
          description="AI를 이용하여 앨범 커버 이미지를 생성하시겠습니까? 이 작업은 한 번만 수행할 수 있습니다."
          onConfirm={handleAiGeneration}
          triggerText={
            <div
              role="button"
              className={`flex justify-between items-center relative border-b-2 pb-2 px-2 mt-4 mr-1 ${
                !canGenerateAi || isGeneratingAi
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
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
                    images.some((img) => img.type === 'ai')
                      ? '#ffaf25'
                      : '#A5A5A5'
                  }
                />
              </div>
            </div>
          }
          triggerClassName="w-full"
          disabled={!canGenerateAi || isGeneratingAi}
        />
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
                    selectedCover === image.url ? 'ring-4 ring-primary-400' : ''
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
