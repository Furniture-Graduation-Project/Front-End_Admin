import { Button } from '@/components/ui/button'
import { cn } from '@/utils/classUtils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

const TopBar = () => {
  return (
    <div className='bg-[#FFFFFF] p-4 w-full h-[70px] flex items-center justify-between'>
      {/* Search Bar */}
      <div className='flex pl-[24px] items-center space-x-4'>
        <Input
          type='text'
          placeholder='Tìm kiếm sản phẩm...'
          className='px-4 py-2 w-[388px] h-[38px] bg-[#F5F6FA] rounded-full border border-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* Right Section */}
      <div className='flex items-center space-x-16'>
        <div className='relative'>
          <Button variant='ghost' className='p-2 text-black focus:outline-none hover:text-blue-500'>
            <img src='/public/Vector.svg' alt='' />
          </Button>
        </div>
        {/* Notification Bell */}
        <div className='relative'>
          <Button variant='ghost' className='p-2 text-black focus:outline-none hover:text-blue-500'>
            <img src='/public/bell.svg' alt='' />
          </Button>
          <span className='absolute top-0 right-0 inline-block w-2 h-2 rounded-full'></span>
        </div>

        {/* Shopping Cart */}
        <div className='relative'>
          <Button variant='ghost' className='p-2 text-black focus:outline-none hover:text-blue-500'>
            <img src='/public/cart.svg' alt='' />
          </Button>
        </div>

        {/* Chat Icon */}
        <div className='relative'>
          <Button variant='ghost' className='p-2 text-black focus:outline-none hover:text-blue-500'>
            <img src='/public/chat.svg' alt='' />
          </Button>
        </div>

        {/* Profile Section */}
        <div className='flex items-center space-x-2 bg-[#F5F6FA] px-4 py-[10px]'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='text-[#404040]'>
            <p className='text-sm font-medium'>Admin Name</p>
            <p className='text-xs text-gray-400'>Admin Role</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
