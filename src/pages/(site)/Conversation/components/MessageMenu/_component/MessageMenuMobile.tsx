import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IMessageMenu } from '@/interface/messageMenu'
import { AlignJustify } from 'lucide-react'

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
            {menu.buttons.map(({ icon: Icon, text, count }) => (
              <DropdownMenuItem key={text}>
                <Icon className='mr-2 h-4 w-4' />
                <span>{text}</span>
                <span className='ml-auto'>{count}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Nhãn</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {menu.labels.map(({ text }) => (
                    <DropdownMenuItem key={text} className='flex items-center'>
                      <input type='checkbox' className='mr-2 h-4 w-4' />
                      <span>{text}</span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Thêm...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default MessageMenuMobile
