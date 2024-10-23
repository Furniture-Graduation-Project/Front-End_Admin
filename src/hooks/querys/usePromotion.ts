import { useQuery } from '@tanstack/react-query'
import { PromotionService } from '@/services/promotionService'
import { IPromotion } from '@/interface/promotion'

export const usePromotionQuery = (promotionId?: string) => {
  const { data, isLoading, isError, error, ...rest } = useQuery<IPromotion>({
    queryKey: promotionId ? ['Promotion', promotionId] : ['Promotion'],
    queryFn: async () => {
      if (promotionId) {
        return await PromotionService.getPromotionById(promotionId)
      } else {
        return await PromotionService.getAllPromotions()
      }
    },
    enabled: !!promotionId || true
  })

  return {
    data,
    isLoading,
    isError,
    error,
    ...rest
  }
}
