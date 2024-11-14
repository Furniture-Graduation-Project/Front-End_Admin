import { BlogService } from '@/services/blog'
import { useMutation } from '@tanstack/react-query'
import { ICreateBlog } from '@/interface/blog'

type BlogMutation = 'CREATE' | 'UPDATE' | 'DELETE'

export const useBlogMutation = (key: BlogMutation) => {
  const { mutate } = useMutation({
    mutationKey: ['Blog'],
    mutationFn: async (params: { id?: string; data: ICreateBlog }) => {
      switch (key) {
        case 'CREATE':
          return await BlogService.create(params.data)
        case 'UPDATE':
          if (!params.id) throw new Error('ID is required for update')
          return await BlogService.update(params.id, params.data)
        case 'DELETE':
          if (!params.id) throw new Error('ID is required for delete')
          return await BlogService.delete(params.id)
        default:
          throw new Error('Invalid mutation key')
      }
    }
  })

  return { mutate }
}
