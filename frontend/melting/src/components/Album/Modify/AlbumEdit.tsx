import { useState, useEffect } from 'react'

type AlbumEditProps = {
  albumId: string
  albumName: string
  albumDescription: string
  releaseDate: string
  onUpdateAlbum: (albumId: string, albumDescription: string) => void
}

export default function AlbumEdit({
  albumId,
  albumName,
  albumDescription: initialDescription,
  releaseDate,
  onUpdateAlbum,
}: AlbumEditProps) {
  const [description, setDescription] = useState(initialDescription)
  const [isDescriptionValid, setIsDescriptionValid] = useState(false)

  // 앨범 설명이 처음 값과 다를 경우 유효성 설정
  useEffect(() => {
    setIsDescriptionValid(description !== initialDescription)
  }, [description, initialDescription])

  // 앨범 수정 API 요청
  const handleUpdate = () => {
    if (isDescriptionValid) {
      onUpdateAlbum(albumId, description)
    }
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-semibold mb-4">앨범 정보를 수정해주세요</h1>

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
