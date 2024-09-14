import { VoucherService } from '@/services/voucher'
import { useMutation } from '@tanstack/react-query'

type VoucherMutation = 'CREATE' | 'UPDATE' | 'DELETE'

export const useVoucherMutation = (key: VoucherMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['Voucher'],
    mutationFn: async (params: { id?: string; data?: any }) => {
      switch (key) {
        case 'CREATE':
          return await VoucherService.create()
        case 'UPDATE':
          if (!params.id) throw new Error('ID is required for update')
          return await VoucherService.update(params.id, params.data)
        case 'DELETE':
          if (!params.id) throw new Error('ID is required for delete')
          return await VoucherService.delete(params.id)
        default:
          throw new Error('Invalid mutation key')
      }
    }
  })

  return { mutate }
}
