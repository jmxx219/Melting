import { SVGIconProps } from '@/types/globalType'

export default function MusicNote({ width = 32, height = 32, fill = '#A5A5A5' }: SVGIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 21.76C17.6 21.76 18.9602 21.2002 20.0806 20.0806C21.2002 18.9602 21.76 17.6 21.76 16C21.76 14.4 21.2002 13.0397 20.0806 11.9193C18.9602 10.7997 17.6 10.24 16 10.24C14.4 10.24 13.0397 10.7997 11.9193 11.9193C10.7997 13.0397 10.24 14.4 10.24 16C10.24 17.6 10.7997 18.9602 11.9193 20.0806C13.0397 21.2002 14.4 21.76 16 21.76ZM16 17.28C15.6373 17.28 15.3335 17.1571 15.0886 16.9113C14.8428 16.6664 14.72 16.3626 14.72 16C14.72 15.6373 14.8428 15.3331 15.0886 15.0873C15.3335 14.8424 15.6373 14.72 16 14.72C16.3626 14.72 16.6668 14.8424 16.9126 15.0873C17.1575 15.3331 17.28 15.6373 17.28 16C17.28 16.3626 17.1575 16.6664 16.9126 16.9113C16.6668 17.1571 16.3626 17.28 16 17.28ZM16 28.7999C14.2293 28.7999 12.5653 28.4637 11.008 27.7913C9.45062 27.1197 8.09595 26.208 6.94395 25.056C5.79195 23.904 4.88016 22.5493 4.20859 20.9919C3.53616 19.4346 3.19995 17.7706 3.19995 16C3.19995 14.2293 3.53616 12.5653 4.20859 11.008C4.88016 9.45062 5.79195 8.09595 6.94395 6.94395C8.09595 5.79195 9.45062 4.87974 11.008 4.20731C12.5653 3.53574 14.2293 3.19995 16 3.19995C17.7706 3.19995 19.4346 3.53574 20.9919 4.20731C22.5493 4.87974 23.904 5.79195 25.056 6.94395C26.208 8.09595 27.1197 9.45062 27.7913 11.008C28.4637 12.5653 28.7999 14.2293 28.7999 16C28.7999 17.7706 28.4637 19.4346 27.7913 20.9919C27.1197 22.5493 26.208 23.904 25.056 25.056C23.904 26.208 22.5493 27.1197 20.9919 27.7913C19.4346 28.4637 17.7706 28.7999 16 28.7999Z"
        fill={fill}
      />
    </svg>
  )
}
