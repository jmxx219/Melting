import { ReactNode } from 'react'
import DefaultHeader from '@/components/layout/DefaultHeader'
import Footer from './Footer'
import Logo from './Logo'

interface LayoutProps {
  children: ReactNode
  Header?: ReactNode
  isMainCenter?: boolean
  showHeader?: boolean
  showFooter?: boolean
}

export default function Layout({
  children,
  showHeader = true,
  showFooter = true,
  isMainCenter = false,
  Header = <DefaultHeader title={'홈'} buttonArea={<Logo />} />,
}: LayoutProps) {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <header className="px-5 pt-10">{showHeader && Header}</header>
      <main
        className={`overflow-y-auto flex-1 bg-white p-5 pb-20 flex flex-col max-w-screen ${isMainCenter ? 'justify-center' : ''}`}
      >
        {children}
      </main>

      {showFooter && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <Footer />
        </footer>
      )}
    </div>
  )
}
