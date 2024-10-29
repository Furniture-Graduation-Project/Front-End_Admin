import { useToast } from '@/hooks/use-toast'
import { IEmployee } from '@/interface/employee'
import { EmployeeService } from '@/services/employee'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'

type MutationQueryProps = {
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'SIGN_IN'
}

const useEmployeeMutation = ({ action }: MutationQueryProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['EMPLOYEE']
    })
    switch (action) {
      case 'CREATE':
        toast({
          title: 'Tạo tài khoản nhân viên thành công!'
        })
        break
      case 'UPDATE':
        toast({
          title: 'Cập nhật tài khoản nhân viên thành công!'
        })
        break
      case 'DELETE':
        toast({
          title: 'Xóa tài khoản nhân viên thành công!'
        })
        break
      case 'SIGN_IN':
        toast({
          title: 'Đăng nhập thành công!'
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
    console.log('[EMPLOYEE]', error)
  }

  const mutationFn = async (data: IEmployee | { username: string; password: string }) => {
    switch (action) {
      case 'CREATE':
        return EmployeeService.create(data as IEmployee)
      case 'UPDATE':
        return EmployeeService.update((data as IEmployee)._id, data as IEmployee)
      case 'DELETE':
        return EmployeeService.delete((data as IEmployee)._id)
      case 'SIGN_IN':
        const { username, password } = data as { username: string; password: string }
        return EmployeeService.signIn(username, password)
      default:
        return Promise.reject(new Error('Invalid action'))
    }
  }

  const { mutate, ...rest } = useMutation({
    mutationFn,
    onSuccess: handleSuccess,
    onError: handleError
  })

  const onSubmit: SubmitHandler<IEmployee | { username: string; password: string }> = (data) => {
    mutate(data)
  }

  return { mutate, onSubmit, ...rest }
}

export default useEmployeeMutation
