import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import useAccountMutation from '@/hooks/mutations/useAccountMutation'
import useAccountQuery from '@/hooks/querys/useAccountQuery'
import { toast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AccountDetail = () => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { onSubmit: handleDelete } = useAccountMutation({
    action: 'DELETE'
  })

  const { data } = useAccountQuery(id)

  const user = data?.data?.user || {}

  const onDelete = async () => {
    try {
      setLoading(true)
      if (data) {
        await handleDelete({ _id: user._id })
      }
    } catch (error) {
      toast({
        title: 'Lỗi xoá người dùng',
        description: 'Đã có lỗi xảy ra khi xoá người dùng. Vui lòng thử lại sau.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
      navigate('/account')
    }
  }
  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />

      <div className=''>
        <h2 className='text-[32px] font-semibold mb-7'>Account Details</h2>
        <div className='bg-white shadow-md rounded-lg p-6'>
          <div className='space-y-4'>
            <div className='flex justify-between'>
              <span className='font-bold'>ID:</span>
              <span>{user._id}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-bold'>Name:</span>
              <span>{user.name}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-bold'>Email:</span>
              <span>{user.email}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-bold'>Role:</span>
              <span>{user.role}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-bold'>Created At:</span>
              <span>{user.createdAt && format(new Date(user.createdAt), 'dd/MM/yyyy')}</span>
            </div>
          </div>
          <div className='mt-6'>
            <Button onClick={() => setOpen(true)} variant='outline' color='red'>
              <Trash size={18} className='mr-2 text-red-500' />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountDetail
