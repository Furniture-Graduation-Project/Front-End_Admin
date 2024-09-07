import { Bell, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Link } from 'react-router-dom'
import SideBar from '@/components/common/SideBar/SideBar'
import TopBar from '@/components/common/TopBar/TopBar'

const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-[70px] items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <Link to='/' className='flex items-center gap-2 font-semibold text-2xl'>
              <img src='logo.png' alt='logo' className='w-6 h-6 object-cover' />
              <span className=''>Furniture</span>
            </Link>
            <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
              <Bell className='h-4 w-4' />
              <span className='sr-only'>Toggle notifications</span>
            </Button>
          </div>
          <SideBar />
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-[70px] items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-8'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col'>
              <Link to='/' className='flex items-center gap-2 font-semibold'>
                <img src='logo.png' alt='logo' className='w-6 h-6 object-cover' />
                <span className=''>Furniture</span>
              </Link>
              <SideBar />
            </SheetContent>
          </Sheet>
          <TopBar />
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
