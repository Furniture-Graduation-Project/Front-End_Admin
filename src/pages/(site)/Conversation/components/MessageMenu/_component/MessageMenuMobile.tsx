import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IMessageMenu } from '@/interface/message'
import { AlignJustify } from 'lucide-react'
import { Link } from 'react-router-dom'

const MessageMenuMobile = ({ menu }: { menu: IMessageMenu }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 640px)')

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsOpen(false)
      }
    }

    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return (
    <div className='flex justify-between sm:hidden relative '>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            <AlignJustify />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 ml-5'>
          <DropdownMenuLabel>Thư mục</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {menu.buttons.map(({ icon: Icon, text, count, path }) => (
              <DropdownMenuItem key={text}>
                <Link
                  to={path}
                  key={text}
                  className={`w-full p-[2px] bg-white hover:bg-blue-300 text-black rounded-md flex items-center justify-between`}
                >
                  <div className='flex items-center'>
                    <Icon />
                    <p className='ml-2'>{text}</p>
                  </div>
                  <p>{count}</p>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default MessageMenuMobile
