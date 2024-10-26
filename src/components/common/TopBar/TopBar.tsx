import {
  Bell,
  CircleChevronDown,
  LogOut,
  Mail,
  Maximize,
  Minimize,
  Search,
  Settings,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { SidebarInput, SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { DarkMode } from '@/components/modals/DarkMode'
import useFullScreen from '@/hooks/useFullScreen'

const TopBar = () => {
  const { isFullScreen, toggleFullScreen } = useFullScreen()
  return (
    <header className='fixed md:sticky w-full top-0 left-0 right-0 z-20 flex h-16 items-center gap-2 bg-white dark:bg-slate-950 border-b border-b-slate-200 dark:border-b-slate-800'>
      <div className='flex items-center justify-between w-full h-full gap-2'>
        <div className='flex items-center px-3 sm:px-5'>
          <SidebarTrigger className='-ml-1 dark:text-slate-200' />
          <Separator orientation='vertical' className='mx-2 h-4' />
          <div className='relative'>
            <SidebarInput
              className='rounded-full py-1 ps-10 dark:bg-slate-800 dark:text-slate-200'
              placeholder='Nhập để tìm kiếm...'
            />
            <Button variant={'ghost'} className='absolute left-0 top-1/2 transform -translate-y-1/2'>
              <Search size={20} strokeWidth={2.25} className='dark:text-slate-200' />
            </Button>
          </div>
        </div>

        <div className='flex items-center space-x-4 sm:space-x-8 h-full'>
          <div className='md:flex hidden items-center space-x-4 lg:space-x-8'>
            <Button
              variant='ghost'
              className='p-2 text-black dark:text-slate-200 focus:outline-none hover:text-blue-500'
              onClick={toggleFullScreen}
            >
              {isFullScreen ? (
                <Minimize className={'h-[1.2rem] w-[1.2rem]'} />
              ) : (
                <Maximize className={'h-[1.2rem] w-[1.2rem]'} />
              )}
            </Button>
            <DarkMode />
            <Button
              variant='ghost'
              className='p-2 text-black dark:text-slate-200 focus:outline-none hover:text-blue-500 relative'
            >
              <Bell fill='#2E5CE6' stroke='#2E5CE6' />
              <div className='absolute top-0 right-0 flex items-center justify-center h-4 w-4'>
                <span className='relative flex h-full w-full'>
                  <span className='absolute h-full w-full rounded-full bg-red-400 opacity-75 animate-ping'></span>
                  <span className='relative flex items-center justify-center h-full w-full rounded-full bg-red-500 text-xs text-white'>
                    1
                  </span>
                </span>
              </div>
            </Button>
            <Button
              variant='ghost'
              className='p-2 text-black dark:text-slate-200 focus:outline-none hover:text-blue-500 relative'
            >
              <Mail fill='#ffffff' stroke='#2E5CE6' />
              <div className='absolute top-0 right-0 flex items-center justify-center h-4 w-4'>
                <span className='relative flex h-full w-full'>
                  <span className='absolute h-full w-full rounded-full bg-red-400 opacity-75 animate-ping'></span>
                  <span className='relative flex items-center justify-center h-full w-full rounded-full bg-red-500 text-xs text-white'>
                    1
                  </span>
                </span>
              </div>
            </Button>
          </div>
          <div className='h-full flex items-center space-x-2 bg-[#F5F6FA] dark:bg-slate-800 px-4 py-[10px]'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='hidden sm:block text-[#404040] dark:text-slate-200'>
              <p className='text-sm font-medium'>Admin Name</p>
              <p className='text-xs text-gray-400 dark:text-slate-400'>Admin Role</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='ml-2 dark:text-slate-200'>
                  <CircleChevronDown size={20} strokeWidth={0.75} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg dark:bg-slate-900 dark:border-slate-700'
                side='bottom'
                align='end'
                sideOffset={4}
              >
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className='dark:text-slate-200 flex items-center'>
                    <Settings className='mr-2' />
                    <span>Tài khoản</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className='block md:hidden' />
                <DropdownMenuGroup className='block md:hidden'>
                  <DropdownMenuItem className='dark:text-slate-200'>
                    {isFullScreen ? (
                      <>
                        <Button
                          variant='outline'
                          className='p-2 text-black dark:text-slate-200 focus:outline-none hover:text-blue-500'
                          onClick={() => toggleFullScreen}
                        >
                          <Minimize className={'h-[1.2rem] w-[1.2rem]'} />
                        </Button>
                        <span className='text-xs text-gray-500 dark:text-slate-400'>Thu nhỏ màn hình</span>
                      </>
                    ) : (
                      <>
                        <Button
                          variant='outline'
                          className='p-2 text-black dark:text-slate-200 focus:outline-none hover:text-blue-500'
                          onClick={() => toggleFullScreen}
                        >
                          <Maximize className={'h-[1.2rem] w-[1.2rem]'} />
                        </Button>
                        <span className='text-xs text-gray-500 dark:text-slate-400'>Phóng to màn hình</span>
                      </>
                    )}
                  </DropdownMenuItem>

                  <DropdownMenuItem className='dark:text-slate-200'>
                    <DarkMode />
                    <span className='text-xs text-gray-500 dark:text-slate-400'>Chế độ sáng tối</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className='relative'>
                    <Button
                      variant='ghost'
                      className='p-2 text-black dark:text-slate-200 focus:outline-none hover:text-blue-500'
                    >
                      <Bell fill='#2E5CE6' stroke='#2E5CE6' />
                      <div className='absolute top-0 right-0 flex items-center justify-center h-4 w-4'>
                        <span className='relative flex h-full w-full'>
                          <span className='absolute h-full w-full rounded-full bg-red-400 opacity-75 animate-ping'></span>
                          <span className='relative flex items-center justify-center h-full w-full rounded-full bg-red-500 text-xs text-white'>
                            1
                          </span>
                        </span>
                      </div>
                    </Button>
                    <span className='text-xs text-gray-500 dark:text-slate-400'>Thông báo</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className='relative'>
                    <Button
                      variant='ghost'
                      className='p-2 text-black dark:text-slate-200 focus:outline-none hover:text-blue-500'
                    >
                      <Mail fill='#ffffff' stroke='#2E5CE6' />
                      <div className='absolute top-0 right-0 flex items-center justify-center h-4 w-4'>
                        <span className='relative flex h-full w-full'>
                          <span className='absolute h-full w-full rounded-full bg-red-400 opacity-75 animate-ping'></span>
                          <span className='relative flex items-center justify-center h-full w-full rounded-full bg-red-500 text-xs text-white'>
                            1
                          </span>
                        </span>
                      </div>
                    </Button>
                    <span className='text-xs text-gray-500 dark:text-slate-400'>Thư</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem className='dark:text-slate-200 flex items-center'>
                  <LogOut className='mr-2' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar
