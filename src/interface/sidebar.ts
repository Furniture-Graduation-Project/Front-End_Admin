import { JSX } from 'react'

export interface MenuItem {
  name: string
  icon: JSX.Element
}

export interface SidebarMenuProps {
  items: MenuItem[]
  isOpen: boolean
}

export interface SidebarHeaderProps {
  isOpen: boolean
  toggleSidebar: () => void
}
