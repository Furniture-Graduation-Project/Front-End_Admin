import { AccountService } from '@/services/account'
import { useQuery } from '@tanstack/react-query'

const useAccountQuery = (id?: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ACCOUNT', id],
    queryFn: async () => {
     if (!id) {
      throw new Error('Account id is required')
     } 
      return  await AccountService.getById(id)
    }
  })
  return { data, ...rest }
}

export default useAccountQuery

export const useAccountQueryLimited = ( pagination : any) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ACCOUNT'],
    queryFn: async () => {
      const res =  await AccountService.getAll(pagination)
      return res.data
    }
  })
  return { data, ...rest }
}