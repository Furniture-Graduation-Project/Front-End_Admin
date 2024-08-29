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

const MessageMenuMobile = ({ menu }: { menu: IMessageMenu }) => {
  return (
    <div className='flex justify-between sm:hidden relative '>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>Tin nhắn của tôi</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
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
