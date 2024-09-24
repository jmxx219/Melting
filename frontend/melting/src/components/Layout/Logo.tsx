interface LogoProps {
  width?: number
  height?: number
}

export default function Logo({ width = 16, height = 16 }: LogoProps) {
  return (
    <img
      src="/images/logo/logo.png"
      alt="로고"
      className={`object-contain ${`w-${width} h-${height}`}`}
    />
  )
}
