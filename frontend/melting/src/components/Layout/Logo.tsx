interface LogoProps {
  width?: number
  height?: number
}

export default function Logo({ width = 4, height = 4 }: LogoProps) {
  return (
    <img
      src="/images/logo/logo.png"
      alt="로고"
      className={`object-contain ${`w-${width} h-${height}`}`}
    />
  )
}
