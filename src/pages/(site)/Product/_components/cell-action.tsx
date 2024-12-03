import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IProduct } from '@/interface/product'
import { useState } from 'react'
interface ProductCellActionProps {
  data: IProduct
}

export const CellAction = ({ data }: ProductCellActionProps) => {
  const [isDropdown, setIsDropdown] = useState(false)

  return (
    <DropdownMenu open={isDropdown} onOpenChange={setIsDropdown}>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='h-8 w-8 p-0'>
          <span className='sr-only'>Mở menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel className='font-bold'>Hành dộng</DropdownMenuLabel>
        {/* Edit */}
        <DropdownMenuItem>
          <Link to={`/product/edit/${data._id}`} className='flex items-center'>
            <Edit2 className='mr-2 h-4 w-4' />
            Chỉnh sửa
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
