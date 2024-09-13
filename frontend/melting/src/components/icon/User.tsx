import { SVGIconProps } from '@/types/globalType'

export default function User({ width = 32, height = 32, fill = '#A5A5A5' }: SVGIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="11" r="6" fill={fill} />
      <path
        d="M26 27.5C26 28 21.5228 28 16 28C10.4772 28 6 28 6 27.5C6 22.2533 10.4772 18 16 18C21.5228 18 26 22.2533 26 27.5Z"
        fill={fill}
      />
    </svg>
  )
}
