import { JSX } from 'react'

export interface MenuItem {
  name: string
  icon: JSX.Element
  link: string
  submenu?: MenuItem[]
}

export interface SidebarMenuProps {
  items: MenuItem[]
  isOpen: boolean
}

export interface SidebarHeaderProps {
  isOpen: boolean
  toggleSidebar: () => void
}
