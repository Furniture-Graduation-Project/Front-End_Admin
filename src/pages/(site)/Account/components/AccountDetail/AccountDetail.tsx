import { AlertModal } from '@/components/modals/alert-modal'
import AlertAcitonDialog from '@/components/modals/AlertDialog'
import { Button } from '@/components/ui/button'
import useAccountMutation from '@/hooks/mutations/useAccountMutation'
import useAccountQuery from '@/hooks/querys/useAccountQuery'
import { toast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import { Lock, Trash, Unlock } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AccountDetail = () => {
  const [loading, setLoading] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { mutate: handleDelete } = useAccountMutation({
    action: 'DELETE',
  })
  const { mutate: lockUser } = useAccountMutation({
    action: 'LOCK',
  })
  const { mutate: unLockUser } = useAccountMutation({
    action: 'UNLOCK',
  })
  const { data } = useAccountQuery(id)
  const user = data?.data || {}

  const onDelete = async () => {
    try {
      setLoading(true)
      if (id) {
        await handleDelete(id)
      }
    } catch (error) {
      toast({
        title: 'Lỗi xoá người dùng',
        description: 'Đã có lỗi xảy ra khi xoá người dùng. Vui lòng thử lại sau.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
      navigate('/account')
    }
  }

  const onLock = () => {
    if (id) {
      lockUser(id)
    } else {
      toast({
        title: 'Lỗi',
        description: 'Không tìm thấy ID người dùng.',
        variant: 'destructive',
      })
    }
  }

  const onUnlock = () => {
    if (id) {
      unLockUser(id)
    } else {
      toast({
        title: 'Lỗi',
        description: 'Không tìm thấy ID người dùng.',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Account Details</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
            alt="Avatar"
            className="w-24 h-24 rounded-full shadow-md object-cover mb-4"
          />
          <span className="text-lg font-semibold text-gray-700">{user.data?.name || "Không có tên"}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
          <div>
            <span className="font-bold text-gray-600">Email:</span>
            <span className="ml-2 text-gray-800">{user.data?.email || "Không có email"}</span>
          </div>
          <div>
            <span className="font-bold text-gray-600">Locations:</span>
            <span className="ml-2 text-gray-800">{user.data?.locations || "Không có password"}</span>
          </div>
          <div>
            <span className="font-bold text-gray-600">Wishlist:</span>
            <span className="ml-2 text-gray-800">{user.data?.wishlist || "Không có password"}</span>
          </div>
          <div>
            <span className="font-bold text-gray-600">Created At:</span>
            <span className="ml-2 text-gray-800">
              {user.data?.createdAt ? format(new Date(user.data?.createdAt), "dd/MM/yyyy") : "Không rõ"}
            </span>
          </div>
          <div>
            <span className="font-bold text-gray-600">Updated At:</span>
            <span className="ml-2 text-gray-800">
              {user.data?.updatedAt ? format(new Date(user.data?.updatedAt), "dd/MM/yyyy") : "Không rõ"}
            </span>
          </div>
          <div>
            <span className="font-bold text-gray-600">Active:</span>
            <span className="ml-2 text-gray-800">{user.data?.active ? "Đang hoạt động" : "Đã khóa"}</span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 justify-between">
          <div className="flex gap-2">
              <Button
                onClick={onLock}
                variant="outline"
                color="yellow"
                className="mr-2"
              >
                <Lock size={18} className="mr-2 text-yellow-500" />
                Lock
              </Button>
              <Button
                onClick={onUnlock}
                variant="outline"
                color="green"
                className="mr-2"
              >
                <Unlock size={18} className="mr-2 text-green-500" />
                UnLock
              </Button>
            </div>
            <Button onClick={() => setOpenDelete(true)} variant="outline" color="red">
              <Trash size={18} className="mr-2 text-red-500" />
              Delete
            </Button>
            <AlertAcitonDialog
              title="Bạn chắc chắn muốn chuyển tài khoản này vào thùng rác ?"
              description="Bản ghi khi chuyển vào thùng rác sẽ bị xóa sau 30 ngày không làm việc."
              variant={'destructive'}
              isOpen={openDelete}
              setIsOpen={setOpenDelete}
              handleAciton={() => handleDelete(id || '')}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountDetail
