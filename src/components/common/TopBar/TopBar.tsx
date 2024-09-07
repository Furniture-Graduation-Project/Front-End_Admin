import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Menu, Search } from 'lucide-react'
import { Language } from './_components/Language'

const TopBar = () => {
  return (
    <div className='flex justify-between items-center w-full'>
      <div className='flex items-center gap-x-6'>
        <Button size={'icon'} variant={'ghost'}>
          <Menu />
        </Button>
        <div className='relative w-[388px]'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Search className='w-5 h-5 text-muted-foreground opacity-50' />
          </div>
          <Input id='feedback' placeholder='Search...' className='pl-10 bg-[#F1F4F9] h-9 rounded-2xl' />
        </div>
      </div>
      <div className='flex items-center gap-x-8'>
        <div className='relative'>
          <img src='icons/bell.svg' alt='bell-icon' />
          <div className='w-4 h-4 rounded-full absolute -top-2 -right-1 bg-[#f93c65] text-xs text-white text-center'>
            6
          </div>
        </div>
        <Language />
      </div>
    </div>
  )
}

export default TopBar
