import { ReactNode, ComponentType } from 'react'
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
      <main className={`flex flex-col flex-grow bg-white p-5 ${isMainCenter ? 'justify-center' : ''}`}>{children}</main>
      <footer>{showFooter && <Footer />}</footer>
    </div>
  )
}
