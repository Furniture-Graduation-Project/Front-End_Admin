import { axiosInstance } from '@/config/axios'
import { AxiosResponse } from 'axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IBlog } from '@/interface/blog'

const API = '/blog'

export const BlogService = {
  getAll: async (): Promise<AxiosResponse<IApiResponse<IBlog[]>>> => {
    try {
      const response = await axiosInstance.get(API)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy tất cả bài viết:', error)
      throw error
    }
  },

  getLimited: async (pagination: {
    pageIndex: number
    pageSize: number
  }): Promise<AxiosResponse<IApiResponse<IBlog[]>>> => {
    try {
      const response = await axiosInstance.get(
        `${API}/limited?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
      )
      return response
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bài viết giới hạn:', error)
      throw error
    }
  },

  getById: async (id: string): Promise<AxiosResponse<IApiResponse<IBlog>>> => {
    try {
      const response = await axiosInstance.get(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy bài viết với ID ${id}:`, error)
      throw error
    }
  },

  create: async (data: IBlog): Promise<AxiosResponse<IApiResponse<IBlog>>> => {
    try {
      const response = await axiosInstance.post(API, data)
      return response
    } catch (error) {
      console.error('Lỗi khi tạo bài viết mới:', error)
      throw error
    }
  },

  update: async (id: string, data: Partial<IBlog>): Promise<AxiosResponse<IApiResponse<IBlog>>> => {
    try {
      const response = await axiosInstance.put(`${API}/${id}`, data)
      return response
    } catch (error) {
      console.error(`Lỗi khi cập nhật bài viết với ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string): Promise<AxiosResponse<IApiResponse<void>>> => {
    try {
      const response = await axiosInstance.delete(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi xóa bài viết với ID ${id}:`, error)
      throw error
    }
  },

  getByAuthorId: async (authorId: string): Promise<AxiosResponse<IApiResponse<IBlog[]>>> => {
    try {
      const response = await axiosInstance.get(`${API}/author/${authorId}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy bài viết theo tác giả với ID ${authorId}:`, error)
      throw error
    }
  }
}
