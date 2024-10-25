import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Trash2, Info, Edit2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from '@/hooks/use-toast'
import { IOrder } from '@/interface/order'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import AlertAcitonDialog from '@/components/modals/AlertDialog'

interface CellActionProps {
  data: IOrder
}

export const CellAction = ({ data }: CellActionProps) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [isDropdown, setIsDropdown] = useState(false)
  const { onSubmit: handleDelete } = useOrderMutation({
    action: 'DELETE'
  })

  const resetPointerEvents = () => {
    document.body.style.pointerEvents = 'auto'
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await handleDelete(data)
      setOpen(false)
      toast({
        title: 'Xoá thành công',
        description: `Đơn hàng ${data.orderName} đã được xoá thành công.`,
        variant: 'default'
      })
    } catch (error) {
      toast({
        title: 'Lỗi xoá đơn hàng',
        description: 'Đã xảy ra lỗi khi xoá đơn hàng.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
      resetPointerEvents()
    }
  }

  useEffect(() => {
    if (!loading) {
      resetPointerEvents()
    }
  }, [loading])

  return (
    <>
      <AlertAcitonDialog
        title='Bạn chắc chắn muốn chuyển bản ghi này vào thùng rác ?'
        description='Bản ghi khi chuyển vào thùng rác sẽ bị xóa sau 30 ngày không làm việc .'
        variant={'destructive'}
        isOpen={open}
        setIsOpen={setOpen}
      />
      <DropdownMenu open={isDropdown} onOpenChange={setIsDropdown}>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel className='font-bold'>Hành Động</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link to={``} className='flex items-center'>
              <Info className='mr-2 h-4 w-4' />
              Thông Tin
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to={`/order/edit/${data._id}`} className='flex items-center'>
              <Edit2 className='mr-2 h-4 w-4' />
              Chỉnh Sửa
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsDropdown(false)} onClick={() => setOpen(true)}>
            <Trash2 className='mr-2 h-4 w-4 text-red-500' />
            Xoá
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
