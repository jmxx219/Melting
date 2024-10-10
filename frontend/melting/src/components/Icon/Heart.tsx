import { SVGIconProps } from '@/types/globalType' // 공통 타입을 사용한다고 가정

export default function Heart({
  width = 18, // 기본 너비
  height = 16, // 기본 높이
  fill = '#ADADAD', // 기본 색상
  fillOpacity = 0.4, // 기본 불투명도
}: SVGIconProps & { fillOpacity?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.48868 2.18912C3.20699 0.470814 5.99291 0.470814 7.71122 2.18912L8.99995 3.47785L10.2887 2.18912C12.007 0.470814 14.7929 0.470814 16.5112 2.18912C18.2295 3.90743 18.2295 6.69335 16.5112 8.41166L8.99995 15.9229L1.48868 8.41166C-0.229626 6.69335 -0.229626 3.90743 1.48868 2.18912Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
    </svg>
  )
}
