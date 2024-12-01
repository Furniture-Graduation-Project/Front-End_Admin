import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { AxiosResponse } from 'axios'
const API_URL = 'users'
export const AccountService = {
  lockUser: async (id: string, data: any) => {
    try {
      const response = await axiosInstance.put('/update/' + id, data)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  getAll: async (pagination: { pageIndex: number; pageSize: number }): Promise<AxiosResponse<IApiResponse<any>>> => {
    try {
      const response: AxiosResponse<IApiResponse<any>> = await axiosInstance.get(
        `${API_URL}?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
      )
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm giới hạn:`, error)
      throw error
    }
  },
  count: async (period : string): Promise<AxiosResponse<IApiResponse<any>>> => {
    try {
      const response: AxiosResponse<IApiResponse<any>> = await axiosInstance.get(`users/count?period=${period}`)
      return response
    } catch (error) {
      throw error
    }
  },
  getById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`users/${id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  delete: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/users/${id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
