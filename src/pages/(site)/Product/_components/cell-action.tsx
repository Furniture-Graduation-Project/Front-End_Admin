import React, { useState } from 'react'
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
import { toast } from '@/hooks/use-toast'
import { useProductMutation } from '@/hooks/mutations/useProductMutation'
import ConfirmationModal from '../ConfirmationModal'

interface ProductCellActionProps {
  data: IProduct
  onDelete: (id: string) => void
}

export const CellAction = ({ data, onDelete }: ProductCellActionProps) => {
  const [isDropdown, setIsDropdown] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { mutate: deleteProduct } = useProductMutation('DELETE')

  const handleDelete = async () => {
    try {
      await deleteProduct({ id: data._id })
      onDelete(data._id)
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
    setIsModalOpen(false)
  }

  return (
    <>
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
            <Link to={`/product/info/${data._id}`} className='flex items-center'>
              <Info className='mr-2 h-4 w-4' />
              Info
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to={`/product/edit/${data._id}`} className='flex items-center'>
              <Edit2 className='mr-2 h-4 w-4' />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsModalOpen(true)} className='text-red-600'>
            <Trash2 className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title='Xác nhận xóa sản phẩm'
        description={`Bạn có chắc chắn muốn xóa sản phẩm ${data.name} không?`}
      />
    </>
  )
}
