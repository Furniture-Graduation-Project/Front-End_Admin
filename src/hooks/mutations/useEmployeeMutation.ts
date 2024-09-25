import { useToast } from '@/hooks/use-toast'
import { IEmployee } from '@/interface/employee'
import { EmployeeService } from '@/services/employee'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'

type MutationQueryProps = {
  action: 'CREATE' | 'UPDATE' | 'DELETE'
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
          title: 'Tạo tài khoản nhân viên thành công!',
          variant: 'success'
        })
        break
      case 'UPDATE':
        toast({
          title: 'Cập nhật tài khoản nhân viên thành công!',
          variant: 'success'
        })
        break
      case 'DELETE':
        toast({
          title: 'Xóa tài khoản nhân viên thành công!',
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
    console.log('[EMPLOYEE]', error)
  }

  const { mutate, ...rest } = useMutation({
    mutationFn: async (data: IEmployee) => {
      switch (action) {
        case 'CREATE':
          return await EmployeeService.create(data)
        case 'UPDATE':
          return await EmployeeService.update(data)
        case 'DELETE':
          return await EmployeeService.delete(data)
        default:
          return null
      }
    },
    onSuccess: handleSuccess,
    onError: handleError
  })

  const onSubmit: SubmitHandler<IEmployee> = (data) => {
    mutate(data)
  }

  return { mutate, onSubmit, ...rest }
}

export default useEmployeeMutation
