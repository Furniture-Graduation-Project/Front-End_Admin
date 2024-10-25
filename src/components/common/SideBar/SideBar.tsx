import { ChevronRight, Power, Settings } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import navMenu from '@/assets/data/navMenu'

const SideBar = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)

  const handleToggle = (title: string) => {
    setOpenSubMenu((prev) => (prev === title ? null : title))
  }

  return (
    <Sidebar collapsible='icon' className='dark:bg-slate-950'>
      <SidebarHeader className='border-b border-b-slate-200 dark:border-b-slate-800 h-16 flex justify-center'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground dark:text-white'
            >
              <div className='aspect-square size-10 text-sidebar-primary-foreground'>
                <img src='logo.png' alt='logo' className='w-full h-full object-cover' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight dark:text-slate-200'>
                <span className='truncate font-semibold text-xl'>Nội Thất River</span>
                <span className='truncate text-xs dark:text-slate-400'>Trang quản trị</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='dark:text-slate-400'>Thanh điều hướng</SidebarGroupLabel>
          <SidebarMenu>
            {navMenu.navMain.map((item) => (
              <Collapsible key={item.title} asChild className='group/collapsible'>
                <SidebarMenuItem>
                  {item.items ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`text-lg h-12 p-3 dark:text-slate-200 dark:hover:bg-slate-800 ${
                            openSubMenu === item.title ? 'bg-gray-200 dark:bg-slate-700 font-semibold' : ''
                          }`}
                          onClick={() => handleToggle(item.title)}
                        >
                          {item.icon && <item.icon className='w-7 h-7 mr-2' />}
                          <span>{item.title}</span>
                          <ChevronRight
                            className={`ml-auto transition-transform duration-200 ${
                              openSubMenu === item.title ? 'rotate-90' : ''
                            } w-6 h-6`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent hidden={openSubMenu !== item.title}>
                        <SidebarMenuSub className='pl-6'>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title} className='pl-1 space-y-1 py-1'>
                              <SidebarMenuSubButton
                                asChild
                                className='text-base h-10 p-2 dark:text-slate-200 dark:hover:bg-slate-800'
                              >
                                <Link
                                  className={
                                    'ms-center rounded transition-colors duration-200 text-gray-900 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-800'
                                  }
                                  to={subItem.url}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : (
                    <NavLink
                      end
                      to={item.url}
                      className={({ isActive, isPending }) =>
                        `flex items-center rounded transition-colors duration-200 ${
                          isPending
                            ? 'bg-yellow-200'
                            : isActive
                              ? 'bg-gray-200 dark:bg-slate-700 font-semibold'
                              : 'text-gray-900 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-800'
                        }`
                      }
                    >
                      <SidebarMenuButton tooltip={item.title} className='text-lg h-12 p-3'>
                        {item.icon && <item.icon className='w-7 h-7 mr-2' />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </NavLink>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to='/settings'>
              <SidebarMenuButton className='text-lg h-12 p-3 dark:text-slate-200 dark:hover:bg-slate-800'>
                <Settings className='w-7 h-7' />
                <span>Tài Khoản</span>
              </SidebarMenuButton>
            </Link>
            <Link to='/logout'>
              <SidebarMenuButton className='text-lg h-12 p-3 dark:text-slate-200 dark:hover:bg-slate-800'>
                <Power className='w-7 h-7' />
                <span>Đăng Xuất</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default SideBar
