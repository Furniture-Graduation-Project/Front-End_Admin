import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit2, LucideBan, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import AlertAcitonDialog from '@/components/modals/AlertDialog'
import { ProductService } from '@/services/product'
import { IProduct } from '@/interface/product'

interface ProductCellActionProps {
  data: IProduct
}

export const CellAction = ({ data }: ProductCellActionProps) => {
  const [isDropdown, setIsDropdown] = useState(false)
  const [open, setOpen] = useState(false)
  const [, setLoading] = useState(false)

  const handleDiable = async () => {
    if (!data._id) {
      toast({
        title: 'Lỗi',
        description: 'ID sản phẩm không tồn tại.',
        variant: 'destructive',
        duration: 3000
      })
      return
    }

    try {
      setLoading(true)
      const product = ProductService.getById(data._id)
      const updatedData = { ...product, status: 'disable' }
      await ProductService.update(data._id, updatedData as any)
      toast({
        title: 'Chuyển trạng thái thành công',
        description: `Sản phẩm ${data.name} đã được chuyển sang danh sách ngừng bán".`,
        variant: 'success',
        duration: 3000
      })
    } catch (error) {
      toast({
        title: 'Lỗi chuyển trạng thái sản phẩm',
        description: 'Đã xảy ra lỗi khi chuyển trạng thái sản phẩm.',
        variant: 'destructive',
        duration: 3000
      })
      console.error('Lỗi khi chuyển trạng thái sản phẩm:', error)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertAcitonDialog
        title='Bạn có chắc chắn muốn chuyển sản phẩm vào danh sách ngừng bán ?'
        variant={'default'}
        className='dark:bg-gray-800 dark:text-white'
        isOpen={open}
        setIsOpen={setOpen}
        handleAciton={handleDiable}
      />
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
            <Link to={`/product/info/${data._id}`} className='flex items-center'>
              <Eye className='mr-2 h-4 w-4' />
              Chi tiết
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to={`/product/edit/${data._id}`} className='flex items-center'>
              <Edit2 className='mr-2 h-4 w-4' />
              Chỉnh sửa
            </Link>
          </DropdownMenuItem>
          {data.status !== 'disable' && (
            <DropdownMenuItem onClick={() => setOpen(true)} className='cursor-pointer'>
              <LucideBan className='mr-2 h-4 w-4' />
              Ngừng bán
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
