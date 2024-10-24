import { axiosInstance } from '@/config/axios'
import { IBlog } from '@/interface/blog'

const API = '/blogs'

export const BlogService = {
  getAll: async () => {
    const response = await axiosInstance.get(API)
    return response.data
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`${API}/${id}`)
    return response.data
  },

  create: async (data: IBlog) => {
    const response = await axiosInstance.post(API, data)
    return response.data
  },

  update: async (id: string, data: IBlog) => {
    const response = await axiosInstance.put(`${API}/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`${API}/${id}`)
    return response.data
  }
}
