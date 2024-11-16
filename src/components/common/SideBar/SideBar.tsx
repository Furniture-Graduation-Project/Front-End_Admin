import { ChevronUp, Power, Settings } from 'lucide-react'
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
  SidebarProvider,
  SidebarRail,
  SidebarSeparator
} from '@/components/ui/sidebar'
import { Link, NavLink } from 'react-router-dom'
import navMenu from '@/assets/data/navMenu'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useState } from 'react'

const SideBar = () => {
  const [open, setOpen] = useState<string | null>(null)
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
            <Accordion type='single' collapsible className='w-full'>
              {navMenu.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <AccordionItem value={item.title}>
                      <AccordionTrigger className='p-0' asChild>
                        <div>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className={`text-lg px-2 py-7 dark:text-slate-200 dark:hover:bg-slate-800 ${open === item.title ? 'bg-gray-200 dark:bg-slate-700 font-semibold' : ''}`}
                          >
                            <>
                              {item.icon && (
                                <item.icon className='w-7 h-7 mr-2 group-data-[state=open]/collapsible:rotate-90' />
                              )}
                              <span>{item.title}</span>
                            </>
                          </SidebarMenuButton>
                          <ChevronUp className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <SidebarMenuSub className='pl-3 me-0'>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title} className='pl-1'>
                              <SidebarMenuSubButton
                                onClick={() => setOpen(item.title)}
                                asChild
                                className='text-base py-5 dark:text-slate-200 dark:hover:bg-slate-800'
                              >
                                <NavLink
                                  className={({ isActive, isPending }) =>
                                    `flex items-center transition-colors duration-200 ${
                                      isPending
                                        ? 'bg-yellow-200'
                                        : isActive
                                          ? 'bg-gray-200 dark:bg-slate-700 font-semibold'
                                          : 'text-gray-900 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-800'
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
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <AccordionItem value={item.title}>
                      <AccordionTrigger className='py-2' asChild>
                        <>
                          <NavLink
                            to={item.url}
                            onClick={() => setOpen(item.title)}
                            className={({ isActive, isPending }) =>
                              `flex items-center w-full rounded transition-colors duration-200 ${
                                isPending
                                  ? 'bg-yellow-200'
                                  : isActive
                                    ? 'bg-gray-200 dark:bg-slate-700 font-semibold'
                                    : 'text-gray-900 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-800'
                              }`
                            }
                          >
                            <SidebarMenuButton tooltip={item.title} className='text-lg px-2 py-7'>
                              {item.icon && <item.icon className='w-7 h-7 mr-2' />}
                              <span>{item.title}</span>
                            </SidebarMenuButton>
                          </NavLink>
                        </>
                      </AccordionTrigger>
                    </AccordionItem>
                  )}
                </SidebarMenuItem>
              ))}
            </Accordion>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to='/setting'>
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
