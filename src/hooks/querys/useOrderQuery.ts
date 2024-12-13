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

export const useMultipleOrderQuery = (pagination?: any, params?: any) => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}
  const { data, ...rest } = useQuery({
    queryKey: ['ORDER', pageIndex, pageSize, params],
    queryFn: async () => {
      if (pagination) {
        const response = await OrderService.getLimited({ pageIndex, pageSize }, params)
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

export const useLatestOrders = () => {
  const { data, isLoading, isError, ...rest } = useQuery({
    queryKey: ['LATEST_ORDERS'],
    queryFn: async () => {
      try {
        const response = await OrderService.getLimited({
          pageIndex: 0,
          pageSize: 5,
          sort: 'createdAt',
          order: 'desc'
        })
        console.log(response.data.data)
        return response.data.data
      } catch (error) {
        const fallbackResponse = await OrderService.getAll()
        const latestOrders = fallbackResponse.data
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
        return latestOrders
      }
    }
  })
  return { data, isLoading, isError, ...rest }
}
