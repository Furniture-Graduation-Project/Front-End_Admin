import { useQuery } from '@tanstack/react-query'
import { CartService } from '@/services/cartService'
import { ICart } from '@/interface/cart'

export const useCartQuery = (userId?: string) => {
  const { data, isLoading, isError, error, ...rest } = useQuery<ICart>({
    queryKey: userId ? ['Cart', userId] : ['Cart'],
    queryFn: async () => {
      if (userId) {
        return await CartService.getCartByUserId(userId)
      } else {
        throw new Error('User ID is required to fetch cart')
      }
    },
    enabled: !!userId
  })

  return {
    data,
    isLoading,
    isError,
    error,
    ...rest
  }
}
