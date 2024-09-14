import { axiosInstance } from '@/config/axios'

const API = '/vouchers'

export const VoucherService = {
  getAll: async () => {
    const response = await axiosInstance.get(API)
    return response.data
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`${API}/${id}`)
    return response.data
  },

  create: async () => {
    const response = await axiosInstance.post(API)
    return response.data
  },

  update: async (id: string, data: any) => {
    const response = await axiosInstance.put(`${API}/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`${API}/${id}`)
    return response.data
  }
}
