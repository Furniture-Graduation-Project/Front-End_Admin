import { axiosInstance } from '@/config/axios'

const API = '/conversation'

export const ConversationService = {
  getAll: async () => {
    const response = await axiosInstance.get(API)
    return response
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`${API}/${id}`)
    return response
  },

  create: async () => {
    const response = await axiosInstance.post(API)
    return response
  },

  update: async (id: string, data: any) => {
    const response = await axiosInstance.put(`${API}/${id}`, data)
    return response
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`${API}/${id}`)
    return response
  },

  getByUserId: async (userId: string) => {
    const response = await axiosInstance.get(`${API}/user/${userId}`)
    return response
  },

  updateByUserId: async (userId: string, data: any) => {
    const response = await axiosInstance.put(`${API}/user/${userId}`, data)
    return response
  },

  getByLabel: async (label: string) => {
    const response = await axiosInstance.get(`${API}/label/${label}`)
    return response
  },

  getByCategory: async (category: string) => {
    const response = await axiosInstance.get(`${API}/category/${category}`)
    return response
  },

  getByStatus: async (status: string) => {
    const response = await axiosInstance.get(`${API}/status/${status}`)
    return response
  },

  setStar: async (id: string) => {
    const response = await axiosInstance.put(`${API}/star`, { id })
    return response
  }
}
