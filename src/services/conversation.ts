import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IConversation } from '@/interface/conversation'
import { AxiosResponse } from 'axios'

const API = 'conversation'

export const ConversationService = {
  getAll: async (): Promise<AxiosResponse<IApiResponse<IConversation[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IConversation[]>> = await axiosInstance.get(API)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy tất cả các cuộc trò chuyện:', error)
      throw error
    }
  },

  getById: async (id: string): Promise<AxiosResponse<IApiResponse<IConversation>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IConversation>> = await axiosInstance.get(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy cuộc trò chuyện với ID ${id}:`, error)
      throw error
    }
  },

  create: async (): Promise<AxiosResponse<IApiResponse<IConversation>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IConversation>> = await axiosInstance.post(API)
      return response
    } catch (error) {
      console.error('Lỗi khi tạo cuộc trò chuyện mới:', error)
      throw error
    }
  },

  update: async (id: string, data: Partial<IConversation>): Promise<AxiosResponse<IApiResponse<IConversation>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IConversation>> = await axiosInstance.put(`${API}/${id}`, data)
      return response
    } catch (error) {
      console.error(`Lỗi khi cập nhật cuộc trò chuyện với ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string): Promise<AxiosResponse<IApiResponse<void>>> => {
    try {
      const response: AxiosResponse<IApiResponse<void>> = await axiosInstance.delete(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi xóa cuộc trò chuyện với ID ${id}:`, error)
      throw error
    }
  },

  getByUserId: async (userId: string): Promise<AxiosResponse<IApiResponse<IConversation[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IConversation[]>> = await axiosInstance.get(`${API}/user/${userId}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy cuộc trò chuyện cho người dùng với ID ${userId}:`, error)
      throw error
    }
  },

  updateByUserId: async (userId: string, data: Partial<IConversation>): Promise<AxiosResponse<IApiResponse<IConversation>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IConversation>> = await axiosInstance.put(`${API}/user/${userId}`, data)
      return response
    } catch (error) {
      console.error(`Lỗi khi cập nhật cuộc trò chuyện cho người dùng với ID ${userId}:`, error)
      throw error
    }
  },

  getByLabel: async (label: string): Promise<AxiosResponse<IApiResponse<IConversation[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IConversation[]>> = await axiosInstance.get(`${API}/label/${label}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy cuộc trò chuyện theo nhãn ${label}:`, error)
      throw error
    }
  },

  getByCategory: async (category: string): Promise<AxiosResponse<IApiResponse<IConversation[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IConversation[]>> = await axiosInstance.get(`${API}/category/${category}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy cuộc trò chuyện theo thể loại ${category}:`, error)
      throw error
    }
  },

  getByStatus: async (status: string): Promise<AxiosResponse<IApiResponse<IConversation[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IConversation[]>> = await axiosInstance.get(`${API}/status/${status}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy cuộc trò chuyện theo trạng thái ${status}:`, error)
      throw error
    }
  },

  setStar: async (id: string): Promise<AxiosResponse<IApiResponse<IConversation>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IConversation>> = await axiosInstance.put(`${API}/star`, { id })
      return response
    } catch (error) {
      console.error(`Lỗi khi đánh dấu sao cho cuộc trò chuyện với ID ${id}:`, error)
      throw error
    }
  }
}
