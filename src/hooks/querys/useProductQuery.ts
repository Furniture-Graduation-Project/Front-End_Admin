import { ProductService } from '@/services/product'
import { useQuery } from '@tanstack/react-query'

export const useProductQuery = (id?: string, categoryId?: string, isRelated?: boolean) => {
  const { data, isLoading, isError, error, ...rest } = useQuery({
    queryKey: id ? ['Product', id] : categoryId ? ['Product', 'Category', categoryId] : ['Product'],
    queryFn: async () => {
      if (id && isRelated && categoryId) {
        return await ProductService.getRelatedProducts(categoryId, id)
      } else if (id) {
        return await ProductService.getProductById(id)
      } else if (categoryId) {
        return await ProductService.getProductsByCategory(categoryId)
      } else {
        return await ProductService.getAllProducts()
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
