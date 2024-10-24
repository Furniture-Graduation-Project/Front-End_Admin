import { BlogService } from '@/services/blog'
import { useQuery } from '@tanstack/react-query'

export const useBlogQuery = (id?: string) => {
  const { data, isLoading, isError, error, ...rest } = useQuery({
    queryKey: id ? ['Blog', id] : ['Blog'],
    queryFn: async () => {
      if (id) {
        return await BlogService.getById(id)
      } else {
        return await BlogService.getAll()
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
