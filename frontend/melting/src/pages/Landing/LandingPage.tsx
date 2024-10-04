import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import RippleBackground from '@/components/Landing/RippleBackground'
import Logo from '@/components/Layout/Logo.tsx'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className="bg-white p-6 rounded-lg shadow-lg border border-primary-400 hover:shadow-primary-400/20 transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-primary-400">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </Card>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/login')
  }
  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">
      <RippleBackground />
      <div className="relative z-10">
        <header className="py-6">
          <Container>
            <nav className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-primary-400">MELTING</h1>
              <Button
                variant="ghost"
                className="text-black hover:text-black/50"
              >
                로그인
              </Button>
            </nav>
          </Container>
        </header>

        <main>
          <Container className="py-20">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-10">
                <Logo height={200} width={200} />
              </div>
              <div className="text-5xl font-extrabold mb-6 text-primary-400">
                나만의 AI 앨범을 만들어 보세요
              </div>
              <p className="text-xl text-gray-700 mb-8">
                좋아하는 노래를 AI 커버로 생성하고 앨범을 제작해보세요
              </p>
              <Button
                type="button"
                size="lg"
                className="bg-primary-400 hover:bg-primary-500 text-white"
                onClick={handleClick}
              >
                시작하기
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <FeatureCard
                title="AI 기반 커버"
                description="최첨단 AI를 사용하여 좋아하는 노래의 고유한 커버를 생성합니다."
                icon="🎵"
              />
              <FeatureCard
                title="커스터마이징 가능한 앨범"
                description="직관적인 인터페이스로 완벽한 앨범을 만들고 공유하세요."
                icon="💽"
              />
              <FeatureCard
                title="공유 및 검색"
                description="자신의 창작물을 공유하고 다른 사용자로부터 놀라운 AI 커버를 발견하세요."
                icon="🌟"
              />
            </div>
          </Container>
        </main>

        <footer className="py-8 mt-20">
          <Container>
            <div className="text-center text-gray-600">
              <p>&copy; 2024 A701 다양성. All rights reserved.</p>
            </div>
          </Container>
        </footer>
      </div>
    </div>
  )
}
