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
import { ICategory } from '@/interface/category'
import { useState } from 'react'

interface CellActionProps {
  data: ICategory
}

export const CellAction = ({ data }: CellActionProps) => {
  const [isDropdown, setIsDropdown] = useState(false)

  return (
    <DropdownMenu open={isDropdown} onOpenChange={setIsDropdown}>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel className='font-bold'>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link to={`/category/edit/${data._id}`} className='flex items-center'>
            <Edit2 className='mr-2 h-4 w-4' />
            Edit
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
