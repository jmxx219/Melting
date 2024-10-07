import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AlbumUpdateRequestDto } from '@/types/album.ts'
import { albumApi } from '@/apis/albumApi.ts'

export default function AlbumEdit() {
  const location = useLocation()
  const navigate = useNavigate()
  const { albumId, albumName, albumDescription, releaseDate } =
    location.state || {}
  const [description, setDescription] = useState(albumDescription)
  const [isDescriptionValid, setIsDescriptionValid] = useState(false)

  console.log(location.state)

  useEffect(() => {}, [])

  // 앨범 설명이 처음 값과 다를 경우 유효성 설정
  useEffect(() => {
    setIsDescriptionValid(description !== albumDescription)
  }, [description, albumDescription])

  // 앨범 수정 API 요청
  const handleUpdate = async () => {
    if (isDescriptionValid) {
      try {
        const albumUpdateDescription: AlbumUpdateRequestDto = {
          description,
        }

        const response = await albumApi.updateAlbumDescription(
          albumId,
          albumUpdateDescription,
        )
        console.log(response)
        navigate(`/detail/${albumId}`)
      } catch (error) {
        console.error('앨범 수정 중 오류 발생:', error)
      }
    }
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          앨범 명
        </label>
        <input
          type="text"
          value={albumName}
          disabled
          className="w-full mb-4 p-2 border-b-2 border-yellow-500 bg-transparent text-lg outline-none"
        />

        <label className="block mb-2 text-sm font-bold text-gray-700">
          앨범 소개
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-yellow-500 rounded-md mb-2 resize-none"
          rows={4}
          maxLength={1000}
        />
        <div className="text-right text-sm text-gray-500">
          {`${description.length}/1000`}
        </div>

        <p className="mt-4 text-gray-600">발매 일자: {releaseDate}</p>

        <button
          onClick={handleUpdate}
          disabled={!isDescriptionValid}
          className={`w-full mt-6 p-3 rounded-full text-white font-bold ${
            isDescriptionValid
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          수정하기
        </button>
      </div>
    </div>
  )
}
