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
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <header className="px-8 pt-10">{showHeader && Header}</header>
      <main
        className={`overflow-hidden flex-1 bg-white px-8 py-5 ${showFooter ? 'pb-20' : ''} flex flex-col max-w-screen ${isMainCenter ? 'justify-center' : ''}`}
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
