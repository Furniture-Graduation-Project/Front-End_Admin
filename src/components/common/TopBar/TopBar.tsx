import { Bell, CircleChevronDown, LogOut, Mail, Scan, Search, Settings } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { SidebarInput, SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
const TopBar = () => {
  return (
    <header className='fixed md:sticky w-full top-0 left-0 right-0 z-20 flex h-16 items-center gap-2 bg-white border-b border-b-slate-200'>
      <div className='flex items-center justify-between w-full h-full gap-2'>
        <div className='flex items-center px-3 sm:px-5'>
          <SidebarTrigger className='-ml-1' />

          <Separator orientation='vertical' className='mx-2 h-4' />
          <div className='relative'>
            <SidebarInput className='rounded-full py-1 ps-10 ' placeholder='Nhập để tìm kiếm...' />
            <Button variant={'ghost'} className='absolute left-0 top-1/2 transform -translate-y-1/2'>
              <Search size={20} strokeWidth={2.25} />
            </Button>
          </div>
        </div>

        <div className='flex items-center space-x-4 sm:space-x-8 h-full'>
          <div className='md:flex hidden items-center space-x-4 lg:space-x-8'>
            <Button variant='ghost' className='p-2 text-black focus:outline-none hover:text-blue-500'>
              <Scan />
            </Button>
            <Button variant='ghost' className='p-2 text-black focus:outline-none hover:text-blue-500 relative '>
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
            <Button variant='ghost' className='p-2 text-black focus:outline-none hover:text-blue-500 relative'>
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
          <div className='h-full flex items-center space-x-2 bg-[#F5F6FA] px-4 py-[10px]'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='hidden sm:block text-[#404040]'>
              <p className='text-sm font-medium'>Admin Name</p>
              <p className='text-xs text-gray-400'>Admin Role</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='ml-2'>
                  <CircleChevronDown size={20} strokeWidth={0.75} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-48 bg-white shadow-lg rounded-lg ' align='end'>
                <DropdownMenuItem className='flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                  <Settings />
                  <span className='text-sm text-gray-700'>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className='flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                  <LogOut />
                  <span className='text-sm text-gray-700'>Log out</span>
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
