import { PromotionService } from '@/services/promotionService'
import { useMutation } from '@tanstack/react-query'

type PromotionMutation = 'ADD' | 'UPDATE' | 'DELETE'

export const usePromotionMutation = (key: PromotionMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['Promotion'],
    mutationFn: async (params: { id?: string; data?: any }) => {
      switch (key) {
        case 'ADD':
          return await PromotionService.addPromotion(params.data)
        case 'UPDATE':
          if (!params.id) throw new Error('Promotion ID is required for update')
          return await PromotionService.updatePromotion(params.id, params.data)
        case 'DELETE':
          if (!params.id) throw new Error('Promotion ID is required for delete')
          return await PromotionService.deletePromotion(params.id)
        default:
          throw new Error('Invalid mutation key')
      }
    }
  })

  return { mutate }
}
