import { CategoryService } from '@/services/category' // Import CategoryService
import { useMutation } from '@tanstack/react-query'

type CategoryMutation = 'CREATE' | 'UPDATE' | 'DELETE'

export const useCategoryMutation = (key: CategoryMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['Category'],
    mutationFn: async (params: { id?: string; data?: any }) => {
      switch (key) {
        case 'CREATE':
          return await CategoryService.createCategory(params.data)
        case 'UPDATE':
          if (!params.id) throw new Error('ID is required for update')
          return await CategoryService.updateCategoryById(params.id, params.data)
        case 'DELETE':
          if (!params.id) throw new Error('ID is required for delete')
          return await CategoryService.deleteCategoryById(params.id)
        default:
          throw new Error('Invalid mutation key')
      }
    }
  })

  return { mutate }
}
