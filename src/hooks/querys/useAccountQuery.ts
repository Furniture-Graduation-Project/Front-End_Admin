import { AccountService } from '@/services/account'
import { useQuery } from '@tanstack/react-query'

const useAccountQuery = (id?: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ACCOUNT', id],
    queryFn: async () => {
      return id ? await AccountService.getById(id) : await AccountService.getAll()
    }
  })
  return { data, ...rest }
}

export default useAccountQuery
