import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IOrder } from '@/interface/order'
import { AxiosResponse } from 'axios'

const API = 'order'

export const OrderService = {
  create: async (data: IOrder): Promise<AxiosResponse<IApiResponse<IOrder>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IOrder>> = await axiosInstance.post(API, data)
      return response
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng mới:', error)
      throw error
    }
  },

  getAll: async (): Promise<AxiosResponse<IApiResponse<IOrder[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IOrder[]>> = await axiosInstance.get(API)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy tất cả đơn hàng:', error)
      throw error
    }
  },

  getById: async (id: string): Promise<AxiosResponse<IApiResponse<IOrder>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IOrder>> = await axiosInstance.get(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy đơn hàng với ID ${id}:`, error)
      throw error
    }
  },

  update: async (id: string, data: Partial<IOrder>): Promise<AxiosResponse<IApiResponse<IOrder>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IOrder>> = await axiosInstance.put(`${API}/${id}`, data)
      return response
    } catch (error) {
      console.error(`Lỗi khi cập nhật đơn hàng với ID ${id}:`, error)
      throw error
    }
  },

  finishRequest: async (id: string, data: Partial<IOrder>): Promise<AxiosResponse<IApiResponse<IOrder>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IOrder>> = await axiosInstance.put(`${API}/return/${id}`, data)
      return response
    } catch (error) {
      console.error(`Lỗi khi cập nhật đơn hàng với ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string): Promise<AxiosResponse<IApiResponse<void>>> => {
    try {
      const response: AxiosResponse<IApiResponse<void>> = await axiosInstance.delete(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi xóa đơn hàng với ID ${id}:`, error)
      throw error
    }
  },

  getLimited: async (pagination: {
    pageIndex: number
    pageSize: number
    sort? : 'createdAt'
    order? :'desc'
  }): Promise<AxiosResponse<IApiResponse<IOrder[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IOrder[]>> = await axiosInstance.get(
        `${API}/limited?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
      )
      return response
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error)
      throw error
    }
  },

  getByOrderNumber: async (orderNumber: string): Promise<AxiosResponse<IApiResponse<IOrder[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IOrder[]>> = await axiosInstance.get(
        `${API}/search?orderNumber=${orderNumber}`
      )
      return response
    } catch (error) {
      console.error('Lỗi khi tìm kiếm đơn hàng theo mã đơn hàng:', error)
      throw error
    }
  },
  count: async (period: string): Promise<AxiosResponse<IApiResponse<any>>> => {
    try {
      const response: AxiosResponse<IApiResponse<any>> = await axiosInstance.get(`${API}/count?period=${period}`)
      return response
    } catch (error) {
      throw error
    }
  },
  revenue: async (period: string): Promise<AxiosResponse<IApiResponse<any>>> => {
    try {
      const response: AxiosResponse<IApiResponse<any>> = await axiosInstance.get(`${API}/revenue?period=${period}`)
      return response
    } catch (error) {
      throw error
    }
  },
  getLatestOrders: async (): Promise<AxiosResponse<IApiResponse<IOrder[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IOrder[]>> = await axiosInstance.get(
        `${API}/limited?page=1&limit=5&sort=-createdAt`  // Sắp xếp theo thời gian tạo (mới nhất trước)
      )
      return response
    } catch (error) {
      console.error('Lỗi khi lấy 5 đơn hàng mới nhất:', error)
      throw error
    }
  }
}


