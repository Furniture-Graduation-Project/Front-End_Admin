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
    <Sidebar collapsible='icon'>
      <SidebarHeader className='border-b border-b-slate-200 h-16 flex justify-center'>
        <SidebarMenu>
          <SidebarMenuItem className=''>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='aspect-square size-10 ext-sidebar-primary-foreground'>
                <img src='logo.png' alt='logo' className='w-full h-full object-cover' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold text-xl'>Nội Thất River</span>
                <span className='truncate text-xs'>Trang quản trị</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Thanh điều hướng</SidebarGroupLabel>
          <SidebarMenu>
            {navMenu.navMain.map((item) => (
              <Collapsible key={item.title} asChild className='group/collapsible'>
                <SidebarMenuItem>
                  {item.items ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className='text-lg h-12 p-3'
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
                            <SidebarMenuSubItem key={subItem.title} className='pl-1'>
                              <SidebarMenuSubButton asChild className='text-base h-10 p-2'>
                                <NavLink
                                  className={({ isActive, isPending }) =>
                                    `flex items-center rounded transition-colors duration-200 ${
                                      isPending
                                        ? 'bg-yellow-200'
                                        : isActive
                                          ? 'bg-gray-100 font-semibold'
                                          : 'text-gray-900 hover:bg-gray-200'
                                    }`
                                  }
                                  to={subItem.url}
                                >
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : (
                    <NavLink
                      to={item.url}
                      className={({ isActive, isPending }) =>
                        `flex items-center rounded transition-colors duration-200 ${
                          isPending
                            ? 'bg-yellow-200'
                            : isActive
                              ? 'bg-gray-100 font-semibold'
                              : 'text-gray-900 hover:bg-gray-200'
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
              <SidebarMenuButton className='text-lg h-12 p-3'>
                <Settings className='w-7 h-7' />
                <span>Tài Khoản</span>
              </SidebarMenuButton>
            </Link>
            <Link to={'/logout'}>
              <SidebarMenuButton className='text-lg h-12 p-3'>
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
