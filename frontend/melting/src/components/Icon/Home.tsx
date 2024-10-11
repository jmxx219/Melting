import { SVGIconProps } from '@/types/globalType'

export default function Home({ width = 32, height = 32, fill = '#A5A5A5' }: SVGIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.0607 4.43934C16.4749 3.85355 15.5251 3.85355 14.9393 4.43934L4.43934 14.9393C3.85355 15.5251 3.85355 16.4749 4.43934 17.0607C5.02513 17.6464 5.97487 17.6464 6.56066 17.0607L7 16.6213V26.5C7 27.3284 7.67157 28 8.5 28H11.5C12.3284 28 13 27.3284 13 26.5V23.5C13 22.6716 13.6716 22 14.5 22H17.5C18.3284 22 19 22.6716 19 23.5V26.5C19 27.3284 19.6716 28 20.5 28H23.5C24.3284 28 25 27.3284 25 26.5V16.6213L25.4393 17.0607C26.0251 17.6464 26.9749 17.6464 27.5607 17.0607C28.1464 16.4749 28.1464 15.5251 27.5607 14.9393L17.0607 4.43934Z"
        fill={fill}
      />
    </svg>
  )
}
