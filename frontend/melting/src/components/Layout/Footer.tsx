import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { ReactNode, useState } from 'react'
import Hash from '../Icon/Hash'
import Home from '../Icon/Home'
import MusicAlbum from '../Icon/MusicAlbum'
import MusicNote from '../Icon/MusicNote'
import User from '../Icon/User'

interface NavItem {
  icon: ReactNode
  name: string
  href: string
}

const navItems: NavItem[] = [
  { icon: <MusicAlbum />, name: 'album', href: '/album/create' },
  { icon: <MusicNote />, name: 'music', href: '/music' },
  { icon: <Home />, name: 'home', href: '/' },
  { icon: <Hash />, name: 'community', href: '*' },
  { icon: <User />, name: 'user', href: '/mypage' },
]

export default function Footer() {
  const [activeItem, setActiveItem] = useState('/')
  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink
              key={item.name}
              href={item.href}
              className={`flex items-center p-2 ${
                activeItem === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
              onClick={() => setActiveItem(item.href)}
            >
              {item.icon}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
