import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IBlog } from '@/interface/blog'
import { AxiosResponse } from 'axios'

const API = 'blog'

export const BlogService = {
  create: async (data: IBlog): Promise<AxiosResponse<IApiResponse<IBlog>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog>> = await axiosInstance.post(API, data)
      return response
    } catch (error) {
      console.error('Lỗi khi tạo blog mới:', error)
      throw error
    }
  },

  getAll: async (): Promise<AxiosResponse<IApiResponse<IBlog[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog[]>> = await axiosInstance.get(API)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy tất cả blog:', error)
      throw error
    }
  },

  getById: async (id: string): Promise<AxiosResponse<IApiResponse<IBlog>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog>> = await axiosInstance.get(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy blog với ID ${id}:`, error)
      throw error
    }
  },

  update: async (id: string, data: Partial<IBlog>): Promise<AxiosResponse<IApiResponse<IBlog>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog>> = await axiosInstance.put(`${API}/${id}`, data)
      return response
    } catch (error) {
      console.error(`Lỗi khi cập nhật blog với ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string): Promise<AxiosResponse<IApiResponse<void>>> => {
    try {
      const response: AxiosResponse<IApiResponse<void>> = await axiosInstance.delete(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi xóa blog với ID ${id}:`, error)
      throw error
    }
  },

  getBlogsByEmployeeId: async (employeeId: string): Promise<AxiosResponse<IApiResponse<IBlog[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog[]>> = await axiosInstance.get(`${API}/employee/${employeeId}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy blog của nhân viên với ID ${employeeId}:`, error)
      throw error
    }
  },

  getLimited: async (pagination: {
    pageIndex: number
    pageSize: number
  }): Promise<AxiosResponse<IApiResponse<IBlog[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog[]>> = await axiosInstance.get(
        `${API}/limited?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
      )
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy danh sách blog giới hạn:`, error)
      throw error
    }
  },

  searchByTitle: async (title: string): Promise<AxiosResponse<IApiResponse<IBlog[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog[]>> = await axiosInstance.get(`${API}/search?title=${title}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi tìm kiếm blog theo tiêu đề:`, error)
      throw error
    }
  }
}
