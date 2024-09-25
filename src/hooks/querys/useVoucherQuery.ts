import { VoucherService } from '@/services/voucher'
import { useQuery } from '@tanstack/react-query'

export const useVoucherQuery = (id?: string) => {
  const { data, isLoading, isError, error, ...rest } = useQuery({
    queryKey: id ? ['Voucher', id] : ['Voucher'],
    queryFn: async () => {
      if (id) {
        return await VoucherService.getById(id)
      } else {
        return await VoucherService.getAll()
      }
    }
  })
  return {
    data,
    isLoading,
    isError,
    ...rest
  }
}
