import { IUser } from '@/interface/account'
import { AccountService } from '@/services/account'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast'

type MutationQueryProps = {
  action: 'SIGNIN' | 'SIGNUP' | 'DELETE'
}

const useAccountMutation = ({ action }: MutationQueryProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['ACCOUNT']
    })
    switch (action) {
      case 'SIGNUP':
        toast({
          title: 'Đăng ký thành công!',
          description: 'Chuyển đến trang đăng nhập...',
          variant: 'success'
        })
        break
      case 'SIGNIN':
        toast({
          title: 'Đăng nhập thành công!',
          description: 'Chuyển đến trang chính...',
          variant: 'success'
        })
        break
      case 'DELETE':
        toast({
          title: 'Xóa thành công!',
          variant: 'success'
        })
        break
    }
  }

  const handleError = (error: { response: { data: { message: string } } }) => {
    const message = error.response?.data?.message || 'Có lỗi xảy ra!'
    toast({
      title: 'Có lỗi xảy ra!',
      description: message,
      variant: 'destructive'
    })
    console.log('[ACCOUNT]', error)
  }

  const { mutate, ...rest } = useMutation({
    mutationFn: async (data: IUser) => {
      switch (action) {
        case 'SIGNUP':
          return await AccountService.signUp(data)
        case 'SIGNIN':
          return await AccountService.signIn(data)
        case 'DELETE':
          return await AccountService.delete(data?._id || '')
        default:
          return null
      }
    },
    onSuccess: handleSuccess,
    onError: handleError
  })

  const onSubmit: SubmitHandler<IUser> = (data) => {
    mutate(data)
  }

  return { mutate, onSubmit, ...rest }
}

export default useAccountMutation
