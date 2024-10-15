import SideBar from '@/components/common/SideBar/SideBar'
import TopBar from '@/components/common/TopBar/TopBar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Banknote,
  BarChart,
  CalendarDays,
  Clipboard,
  Gift,
  Grid3X3,
  Heart,
  LayoutDashboard,
  ListChecks,
  Menu,
  MessagesSquare,
  Package,
  Power,
  Rows3,
  Settings,
  User,
  Users
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative h-screen w-full'>
      <div className='grid grid-cols-1 md:grid-cols-[auto_1fr] min-h-screen'>
        <div className={`relative transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} bg-muted`}>
          <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </div>

        <div className='flex flex-col w-full'>
          <header className='bg-white sticky top-0 z-10 flex h-[70px] w-full items-center gap-4 bg-muted/40  sm:h-[60px] sm:px-5 lg:h-[60px] lg:px-5'>
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
                <nav className='grid gap-2 text-lg font-medium'>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <LayoutDashboard className='h-5 w-5' />
                    Dashboard
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <Package className='h-5 w-5' />
                    Products
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <Heart className='h-5 w-5' />
                    Favourites
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <MessagesSquare className='h-5 w-5' />
                    Inbox
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <ListChecks className='h-5 w-5' />
                    Order Lists
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <Rows3 className='h-5 w-5' />
                    Product Stock
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <Gift className='h-5 w-5' />
                    Pricing
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <CalendarDays className='h-5 w-5' />
                    Calendar
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <Clipboard className='h-5 w-5' />
                    To-Do
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <Users className='h-5 w-5' />
                    Contact
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <Banknote className='h-5 w-5' />
                    Invoice
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <BarChart className='h-5 w-5' />
                    UI Elements
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <User className='h-5 w-5' />
                    Team
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <Grid3X3 className='h-5 w-5' />
                    Table
                  </Link>
                  <Link
                    to='#'
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                  >
                    <Settings className='h-5 w-5' />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <TopBar />
          </header>

          <main className='px-3 sm:px-5 flex-1 overflow-auto'>{children}</main>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
