import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import useAccountMutation from '@/hooks/mutations/useAccountMutation'
import { MoreHorizontal, Trash2, UserSearch } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserColumn } from './columns'
import { toast } from '@/hooks/use-toast'

interface CellActionProps {
  data: UserColumn
}

export const CellAction = ({ data }: CellActionProps) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const { onSubmit: handleDelete } = useAccountMutation({
    action: 'DELETE'
  })

  const resetPointerEvents = () => {
    document.body.style.pointerEvents = 'auto'
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await handleDelete({ _id: data.id })
      setOpen(false)
      toast({
        title: 'Xoá thành công',
        description: `Người dùng ${data.name} đã được xoá thành công.`,
        variant: 'default'
      })
    } catch (error) {
      toast({
        title: 'Lỗi xoá người dùng',
        description: 'Đã xảy ra lỗi khi xoá người dùng.',
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
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
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
            <Link to={`/account/${data.id}`} className='flex items-center'>
              <UserSearch className='mr-2 h-4 w-4' />
              Info
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash2 className='mr-2 h-4 w-4 text-red-500' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
