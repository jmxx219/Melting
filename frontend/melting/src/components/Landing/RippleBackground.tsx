import { useEffect, useRef } from 'react'

interface Ripple {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

export default function RippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ripples: Ripple[] = []
    const rippleCount = 8

    for (let i = 0; i < rippleCount; i++) {
      ripples.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0,
        opacity: 0.6,
        speed: 1 + Math.random() * 0.1,
      })
    }

    function drawRipple(ripple: Ripple) {
      ctx.beginPath()
      ctx.arc(ripple.x, ripple.y, ripple.size, 0, Math.PI * 5)
      ctx.fillStyle = `rgba(255, 175, 37, ${ripple.opacity})`
      ctx.fill()
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ripples.forEach((ripple) => {
        ripple.size += ripple.speed
        ripple.opacity = 0.7 * (1 - ripple.size / (canvas.width / 2))

        if (ripple.opacity <= 0) {
          ripple.x = Math.random() * canvas.width
          ripple.y = Math.random() * canvas.height
          ripple.size = 0
          ripple.opacity = 0.7
        }

        drawRipple(ripple)
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-30"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} // light background color
    />
  )
}
