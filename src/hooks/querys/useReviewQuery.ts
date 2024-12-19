import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { ReviewService } from '@/services/review'
import { useQuery } from '@tanstack/react-query'
import { PaginationState } from '@tanstack/react-table'

export const useReviewQuery = (id?: string) => {
  const { data, isLoading, isError, error, ...rest } = useQuery({
    queryKey: id ? ['Review', id] : ['Review'],
    queryFn: async () => {
      if (id) {
        return await ReviewService.getReviewById(id)
      } else {
        return await ReviewService.getAllReviews()
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
export const useReviewByProductIdQuery = (id: string, pagination: PaginationState) => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}
  const { data, isLoading, isError, error, ...rest } = useQuery({
    queryKey: ['Review', id, pageIndex, pageSize],
    queryFn: async () => {
      const response = await ReviewService.getReviewsByProductId(id, { pageIndex, pageSize })
      return response.data
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
