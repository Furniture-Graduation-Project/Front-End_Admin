import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IOrder } from '@/interface/order'

interface CellActionProps {
  data: IOrder
}

export const CellAction = ({ data }: CellActionProps) => {
  const [isDropdown, setIsDropdown] = useState(false)

  return (
    <>

      <DropdownMenu open={isDropdown} onOpenChange={setIsDropdown}>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className='h-8 w-8 p-0'>
            <span className='sr-only'>Mở menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel className='font-bold'>Hành Động</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link to={`/order/edit/${data._id}`} className='flex items-center'>
              <Edit2 className='mr-2 h-4 w-4' />
              Chỉnh Sửa
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
