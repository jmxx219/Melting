import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { ReactNode, useState } from 'react'
import Hash from '../icon/Hash'
import Home from '../icon/Home'
import MusicAlbum from '../icon/MusicAlbum'
import MusicNote from '../icon/MusicNote'
import User from '../icon/User'

interface NavItem {
  icon: ReactNode
  name: string
  href: string
}

const navItems: NavItem[] = [
  { icon: <MusicAlbum />, name: 'album', href: '/album' },
  { icon: <MusicNote />, name: 'music', href: '/music' },
  { icon: <Home />, name: 'home', href: '/' },
  { icon: <Hash />, name: 'community', href: '*' },
  { icon: <User />, name: 'user', href: '*' },
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
