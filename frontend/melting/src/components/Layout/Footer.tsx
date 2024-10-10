import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import MusicAlbum from '../Icon/MusicAlbum'
import MusicNote from '../Icon/MusicNote'
import Home from '../Icon/Home'
import Hash from '../Icon/Hash'
import User from '../Icon/User'

interface NavItem {
  icon: (props: { fill: string }) => ReactNode
  name: string
  href: string
}

const navItems: NavItem[] = [
  { icon: MusicAlbum, name: 'album', href: '/album/create' },
  { icon: MusicNote, name: 'music', href: '/music' },
  { icon: Home, name: 'home', href: '/main' },
  { icon: Hash, name: 'community', href: '/community' },
  { icon: User, name: 'user', href: '/mypage' },
]

export default function Footer() {
  const location = useLocation()
  const activeItem = location.pathname

  return (
    <NavigationMenu className="w-full max-w-screen-xl mx-auto">
      <NavigationMenuList className="flex justify-between w-full px-4">
        {navItems.map((item) => {
          const isActive = activeItem === item.href
          const iconColor = isActive ? '#ffaf25' : '#A5A5A5' // primary-400 color code
          return (
            <NavigationMenuItem key={item.name} className="flex-1">
              <NavigationMenuLink
                href={item.href}
                className={`flex flex-col items-center justify-center p-2 w-full h-16 ${
                  isActive ? 'text-primary-400' : 'text-muted-foreground'
                } hover:text-primary-300 transition-colors`}
              >
                {item.icon({ fill: iconColor })}
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
