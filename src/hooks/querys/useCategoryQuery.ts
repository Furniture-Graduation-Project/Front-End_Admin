import { CategoryService } from '@/services/category' // Import CategoryService
import { useQuery } from '@tanstack/react-query'

export const useCategoryQuery = (id?: string) => {
  const { data, isLoading, isError, error, ...rest } = useQuery({
    queryKey: id ? ['Category', id] : ['Category'],
    queryFn: async () => {
      if (id) {
        return await CategoryService.getCategoryById(id)
      } else {
        return await CategoryService.getAllCategories()
      }
    }
  })

  return {
    data,
    isLoading,
    isError,
    error,
    ...rest
  }
}
