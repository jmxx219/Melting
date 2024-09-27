import { SVGIconProps } from '@/types/globalType'

export default function Comment({
  width = 24,
  height = 24,
  fill = '#A5A5A5',
}: SVGIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 20.4C7.36085 20.4 3.60004 16.6392 3.60004 12C3.60004 7.36078 7.36085 3.59997 12 3.59997C16.6392 3.59997 20.4 7.36078 20.4 12C20.4 13.7208 19.8826 15.3207 18.9948 16.6527L20.4 20.4L16.2874 19.2249C15.0324 19.9713 13.5663 20.4 12 20.4Z"
        stroke="black"
        stroke-linejoin="round"
        fill={fill}
      />
    </svg>
  )
}
