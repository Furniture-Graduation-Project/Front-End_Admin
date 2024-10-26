import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IBlog } from '@/interface/blog'
import { AxiosResponse } from 'axios'

const API = 'blog'

export const BlogService = {
  // Phương thức tạo một bài viết mới
  create: async (data: IBlog): Promise<AxiosResponse<IApiResponse<IBlog>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog>> = await axiosInstance.post(API, data)
      return response
    } catch (error) {
      console.error('Lỗi khi tạo bài viết mới:', error)
      throw error
    }
  },

  // Lấy tất cả bài viết
  getAll: async (): Promise<AxiosResponse<IApiResponse<IBlog[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog[]>> = await axiosInstance.get(API)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy tất cả bài viết:', error)
      throw error
    }
  },

  // Lấy bài viết theo ID
  getById: async (id: string): Promise<AxiosResponse<IApiResponse<IBlog>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog>> = await axiosInstance.get(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy bài viết với ID ${id}:`, error)
      throw error
    }
  },

  // Cập nhật bài viết theo ID
  update: async (id: string, data: Partial<IBlog>): Promise<AxiosResponse<IApiResponse<IBlog>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog>> = await axiosInstance.put(`${API}/${id}`, data)
      return response
    } catch (error) {
      console.error(`Lỗi khi cập nhật bài viết với ID ${id}:`, error)
      throw error
    }
  },

  // Xóa bài viết theo ID
  delete: async (id: string): Promise<AxiosResponse<IApiResponse<void>>> => {
    try {
      const response: AxiosResponse<IApiResponse<void>> = await axiosInstance.delete(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi xóa bài viết với ID ${id}:`, error)
      throw error
    }
  },

  // Đăng nhập (nếu có)
  signIn: async (username: string, password: string): Promise<AxiosResponse<IApiResponse<IBlog>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog>> = await axiosInstance.post(`${API}/signin`, {
        username,
        password
      })
      return response
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error)
      throw error
    }
  },

  // Lấy danh sách bài viết có phân trang
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
      console.error(`Lỗi khi lấy danh sách bài viết phân trang:`, error)
      throw error
    }
  },

  // Phương thức tìm kiếm bài viết theo tiêu đề
  search: async (searchTerm: string): Promise<AxiosResponse<IApiResponse<IBlog[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog[]>> = await axiosInstance.get(
        `${API}/search?title=${searchTerm}`
      )
      return response
    } catch (error) {
      console.error('Lỗi khi tìm kiếm bài viết:', error)
      throw error
    }
  },

  // Lấy bài viết theo authorId (nếu có)
  getByAuthorId: async (authorId: string): Promise<AxiosResponse<IApiResponse<IBlog[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IBlog[]>> = await axiosInstance.get(`${API}/author/${authorId}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy bài viết theo authorId ${authorId}:`, error)
      throw error
    }
  }
}
