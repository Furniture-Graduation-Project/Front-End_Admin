import { useToast } from '@/hooks/use-toast'
import { IOrder } from '@/interface/order'
import { OrderService } from '@/services/order'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'

type MutationQueryProps = {
  action: 'CREATE' | 'UPDATE' | 'DELETE'
}

const useOrderMutation = ({ action }: MutationQueryProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['ORDER']
    })
    switch (action) {
      case 'CREATE':
        toast({
          title: 'Tạo đơn hàng thành công!'
        })
        break
      case 'UPDATE':
        toast({
          title: 'Cập nhật đơn hàng thành công!'
        })
        break
      case 'DELETE':
        toast({
          title: 'Xóa đơn hàng thành công!'
        })
        break
    }
  }

  const handleError = (error: any) => {
    const message = error?.response?.data?.message || 'Có lỗi xảy ra!'
    toast({
      title: 'Có lỗi xảy ra!',
      description: message,
      variant: 'destructive'
    })
    console.log('[ORDER]', error)
  }

  const mutationFn = async (data: any) => {
    switch (action) {
      case 'CREATE':
        return OrderService.create(data)
      case 'UPDATE':
        return OrderService.update(data._id, data)
      case 'DELETE':
        return OrderService.delete(data._id)
      default:
        return Promise.reject(new Error('Invalid action'))
    }
  }

  const { mutate, ...rest } = useMutation({
    mutationFn,
    onSuccess: handleSuccess,
    onError: handleError
  })

  const onSubmit: SubmitHandler<IOrder> = (data) => {
    mutate(data)
  }

  return { mutate, onSubmit, ...rest }
}

export default useOrderMutation
