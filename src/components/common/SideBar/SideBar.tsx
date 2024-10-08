// SideBar.tsx

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/classUtils'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@radix-ui/react-navigation-menu'
import {
  Banknote,
  BarChart,
  CalendarDays,
  ChevronsLeft,
  ChevronsRight,
  Clipboard,
  Gift,
  Grid3X3,
  Heart,
  LayoutDashboard,
  ListChecks,
  MessagesSquare,
  Package,
  Power,
  Rows3,
  Settings,
  User,
  Users
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { MenuItem, SidebarHeaderProps, SidebarMenuProps } from '../../../interface/sidebar'

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: <LayoutDashboard className='w-6 h-6 mr-3' /> },
  { name: 'Product', icon: <Package className='w-6 h-6 mr-3' /> },
  { name: 'Favourites', icon: <Heart className='w-6 h-6 mr-3' /> },
  { name: 'Inbox', icon: <MessagesSquare className='w-6 h-6 mr-3' /> },
  { name: 'Order Lists', icon: <ListChecks className='w-6 h-6 mr-3' /> },
  { name: 'Product Stock', icon: <Rows3 className='w-6 h-6 mr-3' /> }
]

const Page: MenuItem[] = [
  { name: 'Pricing', icon: <Gift className='w-6 h-6 mr-3' /> },
  { name: 'Calendar', icon: <CalendarDays className='w-6 h-6 mr-3' /> },
  { name: 'To-Do', icon: <Clipboard className='w-6 h-6 mr-3' /> },
  { name: 'Contact', icon: <Users className='w-6 h-6 mr-3' /> },
  { name: 'Invoice', icon: <Banknote className='w-6 h-6 mr-3' /> },
  { name: 'UI Elements', icon: <BarChart className='w-6 h-6 mr-3' /> },
  { name: 'Team', icon: <User className='w-6 h-6 mr-3' /> },
  { name: 'Table', icon: <Grid3X3 className='w-6 h-6 mr-3' /> }
]

const settingsItems: MenuItem[] = [
  { name: 'Settings', icon: <Settings className='w-6 h-6 mr-3' /> },
  { name: 'Logout', icon: <Power className='w-6 h-6 mr-3' /> }
]

const SidebarMenu: React.FC<SidebarMenuProps> = ({ items, isOpen }) => (
  <NavigationMenu>
    <NavigationMenuList className='space-y-4'>
      {items.map((item, index) => (
        <NavigationMenuItem key={index}>
          <a
            href='#'
            className={cn(
              'flex items-center h-12 text-left py-3 px-4 rounded',
              'hover:bg-blue-500 hover:text-white text-gray-900'
            )}
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </a>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
)

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, toggleSidebar }) => (
  <div className={cn('flex items-center justify-center bg-white')}>
    {isOpen ? (
      <Link to='/' className='flex items-center gap-2 font-semibold text-2xl'>
        <img src='logo.png' alt='logo' className='w-6 h-6 object-cover' />
        <span>Furniture</span>
      </Link>
    ) : (
      <div />
    )}

    <Button
      className='p-0 bg-white text-black hover:text-blue-500 hover:bg-white flex items-center justify-center w-10 h-10'
      onClick={toggleSidebar}
    >
      {isOpen ? <ChevronsLeft /> : <ChevronsRight />}
    </Button>
  </div>
)

const SideBar: React.FC<SidebarHeaderProps> = ({ toggleSidebar, isOpen }) => {
  return (
    <div className='hidden md:flex'>
      <div
        className={cn('bg-muted-40 md:block hidden transition-all duration-300 ease-in-out', isOpen ? 'w-64' : 'w-fit')}
      >
        <div className='flex h-full max-h-screen flex-col'>
          <SidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <div className='flex h-screen overflow-y-auto'>
            <div
              className={cn(
                'bg-white text-gray-900 flex flex-col transition-all duration-300 ease-in-out',
                isOpen ? 'w-64' : 'w-20'
              )}
            >
              <nav className='flex justify-start mt-4'>
                <SidebarMenu items={menuItems} isOpen={isOpen} />
              </nav>
              <div className='p-4 border-t'>
                {isOpen && <p className='block py-2 px-4 rounded text-opacity-50 text-gray-900'>PAGES</p>}
              </div>
              <nav className='flex justify-center'>
                <SidebarMenu items={Page} isOpen={isOpen} />
              </nav>
              <nav className='flex justify-center border-t pt-4'>
                <SidebarMenu items={settingsItems} isOpen={isOpen} />
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'fixed top-0 left-0 h-screen z-50 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full md:hidden',
          'bg-muted/40'
        )}
      >
        <div className='flex flex-col h-full max-h-screen overflow-y-auto'>
          <SidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <div className='flex-1 overflow-y-auto  no-scrollbar'>
            <div
              className={cn(
                'bg-white text-gray-900 flex flex-col transition-all duration-300 ease-in-out ',
                isOpen ? 'w-64' : 'w-20'
              )}
            >
              <nav className='mt-4'>
                <SidebarMenu items={menuItems} isOpen={isOpen} />
              </nav>
              <div className='p-4 border-t'>
                {isOpen && <p className='block py-2 px-4 rounded text-opacity-50 text-gray-900'>PAGES</p>}
              </div>
              <nav>
                <SidebarMenu items={Page} isOpen={isOpen} />
              </nav>
              <nav className='border-t pt-4'>
                <SidebarMenu items={settingsItems} isOpen={isOpen} />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
