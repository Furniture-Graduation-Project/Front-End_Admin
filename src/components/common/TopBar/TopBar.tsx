import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { CircleChevronDown, LogOut, Scan, Search, Settings } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'

const TopBar = () => {
  return (
    <div className='bg-[#FFFFFF] sticky  w-full h-[70px] flex items-center justify-between'>
      
      <div className='relative'>
        <Input
          type='text'
          placeholder='Tìm kiếm sản phẩm...'
          className='px-10 py-2 w-[200px] sm:w-[300px] md:w-[388px] h-[38px] bg-[#F5F6FA] rounded-full border border-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <Search
          size={20}
          strokeWidth={2.25}
          className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500'
        />
      </div>

      <div className='flex items-center space-x-4 sm:space-x-8'>
      
        <div className='md:flex hidden items-center space-x-4 lg:space-x-8'>
          <Button variant='ghost' className='p-2 text-black focus:outline-none hover:text-blue-500'>
            <Scan />
          </Button>

          <Button variant='ghost' className='p-2 text-black focus:outline-none hover:text-blue-500 '>
            <img src='/public/bell.svg' alt='Notification' />
            <span className='absolute top-0 right-0 inline-block w-2 h-2 rounded-ful'></span>
          </Button>

          <Button variant='ghost' className='p-2 text-black focus:outline-none hover:text-blue-500'>
            <img src='/public/cart.svg' alt='Cart' />
          </Button>

          <Button variant='ghost' className='p-2 text-black focus:outline-none hover:text-blue-500'>
            <img src='/public/chat.svg' alt='Chat' />
          </Button>
        </div>

       
        <div className='flex items-center space-x-2 bg-[#F5F6FA] px-4 py-[10px]'>
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
  )
}

export default TopBar
