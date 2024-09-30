import AlbumComment from '@/components/Album/Detail/AlbumComment'
import AlbumDetailInfo from '@/components/Album/Detail/AlbumDetailInfo'
import { Button } from '@/components/ui/button'
import { AlbumDetailType } from '@/types/album'
import React from 'react'
import AlbumSong from './AlbumSong'
import AlbumCommentList from './AlbumCommentList'

type AlbumDetailProps = {
  albumId: number
}

export default function AlbumDetail({ albumId }: AlbumDetailProps) {
  const album: AlbumDetailType = {
    albumId,
    albumInfo: {
      albumCoverImage: '/images/mockup/album3.png',
      albumName: 'Band Aid',
      like: 125,
      commentCnt: 14,
      isLike: true,
      nickname: '아티스트1',
      profileImage: 'https://github.com/shadcn.png',
      createDate: '2024.09.02',
      genres: ['밴드', '랩', '힙합'],
      type: '미니',
      description:
        '쏠랑쏠랑의 앨범 Palette는 사랑, 이별, 그리고 회복을 하나의 그림처럼 담아낸다. 앨범 속에는 고백과 눈물, 혼란과 자존심 사이에서 피어나는 사랑의 감정이 진하게 배어 있다. 마치 한 편의 영화처럼 운명적 사랑과 영원한 주인공을 꿈꾸지만, 때로는 고통과 자기희생, 공허함 속에서 이별을 맞이하게 된다.이별 후의 그리움과 불안, 그리고 기억 속의 장미처럼 아련한 회상들이 이어지지만, 결국 위로와 기적 같은 회복이 찾아온다. 따뜻한 미소와 함께 다시 일어설 수 있게 만드는 메시지를 담고 있는 Palette는 각기 다른 감정들이 한데 어우러진 음악적 색채를 선사한다. 쏠랑쏠랑의 앨범 Palette는 사랑, 이별, 그리고 회복을 하나의 그림처럼 담아낸다. 앨범 속에는 고백과 눈물, 혼란과 자존심 사이에서 피어나는 사랑의 감정이 진하게 배어 있다. 마치 한 편의 영화처럼 운명적 사랑과 영원한 주인공을 꿈꾸지만, 때로는 고통과 자기희생, 공허함 속에서 이별을 맞이하게 된다.이별 후의 그리움과 불안, 그리고 기억 속의 장미처럼 아련한 회상들이 이어지지만, 결국 위로와 기적 같은 회복이 찾아온다. 따뜻한 미소와 함께 다시 일어설 수 있게 만드는 메시지를 담고 있는 Palette는 각기 다른 감정들이 한데 어우러진 음악적 색채를 선사한다 쏠랑쏠랑의 앨범 Palette는 사랑, 이별, 그리고 회복을 하나의 그림처럼 담아낸다. 앨범 속에는 고백과 눈물, 혼란과 자존심 사이에서 피어나는 사랑의 감정이 진하게 배어 있다. 마치 한 편의 영화처럼 운명적 사랑과 영원한 주인공을 꿈꾸지만, 때로는 고통과 자기희생, 공허함 속에서 이별을 맞이하게 된다.이별 후의 그리움과 불안, 그리고 기억 속의 장미처럼 아련한 회상들이 이어지지만, 결국 위로와 기적 같은 회복이 찾아온다. 따뜻한 미소와 함께 다시 일어설 수 있게 만드는 메시지를 담고 있는 Palette는 각기 다른 감정들이 한데 어우러진 음악적 색채를 선사한다 쏠랑쏠랑의 앨범 Palette는 사랑, 이별, 그리고 회복을 하나의 그림처럼 담아낸다. 앨범 속에는 고백과 눈물, 혼란과 자존심 사이에서 피어나는 사랑의 감정이 진하게 배어 있다. 마치 한 편의 영화처럼 운명적 사랑과 영원한 주인공을 꿈꾸지만, 때로는 고통과 자기희생, 공허함 속에서 이별을 맞이하게 된다.이별 후의 그리움과 불안, 그리고 기억 속의 장미처럼 아련한 회상들이 이어지지만, 결국 위로와 기적 같은 회복이 찾아온다. 따뜻한 미소와 함께 다시 일어설 수 있게 만드는 메시지를 담고 있는 Palette는 각기 다른 감정들이 한데 어우러진 음악적 색채를 선사한다 쏠랑쏠랑의 앨범 Palette는 사랑, 이별, 그리고 회복을 하나의 그림처럼 담아낸다. 앨범 속에는 고백과 눈물, 혼란과 자존심 사이에서 피어나는 사랑의 감정이 진하게 배어 있다. 마치 한 편의 영화처럼 운명적 사랑과 영원한 주인공을 꿈꾸지만, 때로는 고통과 자기희생, 공허함 속에서 이별을 맞이하게 된다.이별 후의 그리움과 불안, 그리고 기억 속의 장미처럼 아련한 회상들이 이어지지만, 결국 위로와 기적 같은 회복이 찾아온다. 따뜻한 미소와 함께 다시 일어설 수 있게 만드는 메시지를 담고 있는 Palette는 각기 다른 감정들이 한데 어우러진 음악적 색채를 선사한다',
      hashtags: ['태그1', '태그2태그2', '태그3'],
    },
    songs: [
      {
        songId: 1,
        albumCoverImgUrl:
          'https://image.bugsm.co.kr/album/images/200/40955/4095501.jpg?version=20240307012526.0',
        artist: '아이유',
        songTitle: '좋아한 노래 제목 1입니다아아아',
        nickname: '노원핵주먹안녕하세요노원핵주먹안녕하세요',
        executionTime: '3:14',
        likeCount: 123,
        isLiked: true,
        isTitle: true,
      },
      {
        songId: 2,
        albumCoverImgUrl:
          'https://image.bugsm.co.kr/album/images/200/40955/4095501.jpg?version=20240307012526.0',
        artist: '아이유',
        songTitle: '좋아한 노래 제목 2',
        nickname: '노원핵주먹',
        executionTime: '3:14',
        likeCount: 12345,
        isLiked: false,
        isTitle: false,
      },
    ],
    comments: [
      {
        member: '노원핵주먹',
        content: '노래 다 좋네요~ 믿고 듣습니다',
        createdAt: '2024-09-27T04:13:00.712Z',
        profileImg: 'https://github.com/shadcn.png',
      },
      {
        member: '제이슨',
        content: '노래 좋아요 ㅎㅎ',
        createdAt: '2024-09-26T04:13:00.712Z',
        profileImg: 'https://github.com/shadcn.png',
      },
    ],
    commentCnt: 10,
  }
  return (
    <div>
      <div>
        {<AlbumDetailInfo albumInfo={album.albumInfo} albumId={albumId} />}
      </div>
      <div>
        <AlbumSong songs={album.songs} />
      </div>
      <div>
        <AlbumCommentList
          commentCnt={album.commentCnt}
          comments={album.comments}
        />
      </div>
    </div>
  )
}
