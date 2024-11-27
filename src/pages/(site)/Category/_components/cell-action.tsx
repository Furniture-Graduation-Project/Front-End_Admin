import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ICategory } from '@/interface/category'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { CategoryService } from '@/services/category'
import { ProductService } from '@/services/product'

interface CellActionProps {
  data: ICategory
}

export const CellAction = ({ data }: CellActionProps) => {
  const [isDropdown, setIsDropdown] = useState(false)

  const handleDelete = async () => {
    if (!data._id) {
      toast({
        title: 'Lỗi',
        description: 'ID danh mục không tồn tại.',
        variant: 'destructive',
        duration: 3000
      })
      return
    }

    if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục ${data.categoryName} không?`)) {
      try {
        const hasProducts = await ProductService.isCategoryInUse(data.categoryName)
        if (hasProducts) {
          toast({
            title: 'Không thể xóa',
            description: `Danh mục ${data.categoryName} vẫn còn sản phẩm.`,
            variant: 'destructive',
            duration: 3000
          })
        } else {
          await CategoryService.deleteCategory(data._id)
          toast({
            title: 'Xóa thành công',
            description: `Danh mục ${data.categoryName} đã được xóa.`,
            variant: 'success',
            duration: 3000
          })
        }
      } catch (error) {
        toast({
          title: 'Lỗi xóa danh mục',
          description: 'Đã xảy ra lỗi khi xóa danh mục.',
          variant: 'destructive',
          duration: 3000
        })
        console.error('Lỗi khi xóa danh mục:', error)
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

        {/* Edit */}
        <DropdownMenuItem>
          <Link to={`/category/edit/${data._id}`} className='flex items-center'>
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
