import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit2, Trash2, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IProduct } from '@/interface/product'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { ProductService } from '@/services/product'

interface ProductCellActionProps {
  data: IProduct
}

export const CellAction = ({ data }: ProductCellActionProps) => {
  const [isDropdown, setIsDropdown] = useState(false)

  const handleDelete = async () => {
    if (!data._id) {
      toast({
        title: 'Lỗi',
        description: 'ID sản phẩm không tồn tại.',
        variant: 'destructive',
        duration: 3000
      })
      return
    }

    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${data.name} không?`)) {
      try {
        await ProductService.delete(data._id)
        toast({
          title: 'Xóa thành công',
          description: `Sản phẩm ${data.name} đã được xóa.`,
          variant: 'success',
          duration: 3000
        })
      } catch (error) {
        toast({
          title: 'Lỗi xóa sản phẩm',
          description: 'Đã xảy ra lỗi khi xóa sản phẩm.',
          variant: 'destructive',
          duration: 3000
        })
        console.error('Lỗi khi xóa sản phẩm:', error)
      }
    }
  }

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
        
        {/* Info */}
        <DropdownMenuItem>
          <Link to={`/product/info/${data._id}`} className='flex items-center'>
            <Info className='mr-2 h-4 w-4' />
            Info
          </Link>
        </DropdownMenuItem>

        {/* Edit */}
        <DropdownMenuItem>
          <Link to={`/product/edit/${data._id}`} className='flex items-center'>
            <Edit2 className='mr-2 h-4 w-4' />
            Edit
          </Link>
        </DropdownMenuItem>
        
        {/* Delete */}
        <DropdownMenuItem onClick={handleDelete} className='text-red-600'>
          <Trash2 className='mr-2 h-4 w-4' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
