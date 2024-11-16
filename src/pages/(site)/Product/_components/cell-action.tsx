import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Trash2, UserSearch, Edit2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from '@/hooks/use-toast'
import AlertAcitonDialog from '@/components/modals/AlertDialog'
import { useProductMutation } from '@/hooks/mutations/useProductMutation'
import { useState } from 'react'
import { IProduct } from '@/interface/product'

interface CellActionProps {
  data: IProduct
}

export const CellAction = ({ data }: CellActionProps) => {
  const [open, setOpen] = useState(false)

  const { mutate: handleDelete } = useProductMutation('DELETE', () => {
    setOpen(false)
    toast({
      title: 'Xoá thành công',
      description: `Người dùng ${data.name} đã được xoá thành công.`,
      variant: 'success'
    })
  })

  const onDelete = () => {
    handleDelete({ id: data._id })
  }

  return (
    <>
      <AlertAcitonDialog
        title='Bạn chắc chắn muốn chuyển bản ghi này vào thùng rác ?'
        description='Bản ghi khi chuyển vào thùng rác sẽ bị xóa sau 30 ngày không làm việc.'
        variant={'destructive'}
        className='dark:bg-gray-800 dark:text-white'
        isOpen={open}
        setIsOpen={setOpen}
        handleAciton={onDelete}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel className='font-bold'>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link to={`/employee/${data._id}`} className='flex items-center'>
              <UserSearch className='mr-2 h-4 w-4' />
              Info
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to={`/employee/edit/${data._id}`} className='flex items-center'>
              <Edit2 className='mr-2 h-4 w-4' />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpen(true)}>
            <Trash2 className='mr-2 h-4 w-4 text-red-500' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
