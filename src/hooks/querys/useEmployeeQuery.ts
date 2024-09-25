import { EmployeeService } from '@/services/employee'
import { useQuery } from '@tanstack/react-query'

const useEmployeeQuery = (id?: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['EMPLOYEE', id],
    queryFn: async () => {
      return id ? await EmployeeService.getById(id) : await EmployeeService.getAll()
    }
  })
  return { data, ...rest }
}

export default useEmployeeQuery
