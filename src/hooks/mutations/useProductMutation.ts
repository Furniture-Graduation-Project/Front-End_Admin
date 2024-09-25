import { ProductService } from '@/services/product' // Import ProductService
import { useMutation } from '@tanstack/react-query'

type ProductMutation = 'CREATE' | 'UPDATE' | 'DELETE'

export const useProductMutation = (key: ProductMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['Product'],
    mutationFn: async (params: { id?: string; data?: any }) => {
      switch (key) {
        case 'CREATE':
          return await ProductService.createProduct(params.data)
        case 'UPDATE':
          if (!params.id) throw new Error('ID is required for update')
          return await ProductService.updateProductById(params.id, params.data)
        case 'DELETE':
          if (!params.id) throw new Error('ID is required for delete')
          return await ProductService.deleteProductById(params.id)
        default:
          throw new Error('Invalid mutation key')
      }
    }
  })

  return { mutate }
}
