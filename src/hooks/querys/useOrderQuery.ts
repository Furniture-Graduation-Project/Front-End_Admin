import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { OrderService } from '@/services/order'
import { useQuery } from '@tanstack/react-query'

export const useSingleOrderQuery = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ORDER', id],
    queryFn: async () => {
      return await OrderService.getById(id)
    }
  })
  return { data, ...rest }
}

export const useMultipleOrderQuery = (pagination?: any) => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}
  const { data, ...rest } = useQuery({
    queryKey: ['ORDER', pageIndex, pageSize],
    queryFn: async () => {
      if (pagination) {
        const response = await OrderService.getLimited({ pageIndex, pageSize })
        return response.data
      } else {
        const response = await OrderService.getAll()
        return response.data
      }
    }
  })
  return { data, ...rest }
}
export const useOrderCount = (period: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ORDER_COUNT'],
    queryFn: async () => {
      const res = await OrderService.count(period)
      return res.data
    }
  })
  return { data, ...rest }
}
export const useOrderRevenue = (period: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ORDER_REVENUE'],
    queryFn: async () => {
      const res = await OrderService.revenue(period)
      return res.data
    }
  })
  return { data, ...rest }
}
