import { CartService } from '@/services/cartService'
import { useMutation } from '@tanstack/react-query'

type CartMutation = 'ADD' | 'UPDATE' | 'REMOVE' | 'CLEAR'

export const useCartMutation = (key: CartMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['Cart'],
    mutationFn: async (params: { id?: string; data?: any; userId?: string }) => {
      switch (key) {
        case 'ADD':
          return await CartService.addToCart(params.data)
        case 'UPDATE':
          if (!params.id) throw new Error('Cart Item ID is required for update')
          return await CartService.updateCartItem(params.id, params.data)
        case 'REMOVE':
          if (!params.id) throw new Error('Cart Item ID is required for remove')
          return await CartService.removeCartItem(params.id)
        case 'CLEAR':
          if (!params.userId) throw new Error('User ID is required for clearing cart')
          return await CartService.clearCart(params.userId)
        default:
          throw new Error('Invalid mutation key')
      }
    }
  })

  return { mutate }
}
