import { ReactNode, ComponentType } from 'react'
import DefaultHeader from '@/components/layout/DefaultHeader'
import Footer from './Footer'
import Logo from './Logo'
interface LayoutProps {
  children: ReactNode
  Header?: ReactNode
  showHeader?: boolean
  showFooter?: boolean
}

export default function Layout({
  children,
  showHeader = true,
  showFooter = true,
  Header = <DefaultHeader title={'홈'} buttonArea={<Logo />} />,
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-3">{showHeader && Header}</header>
      <main className="flex-grow bg-white px-3">{children}</main>
      <footer>{showFooter && <Footer />}</footer>
    </div>
  )
}
