import { axiosInstance } from '@/config/axios'

const API = '/product-item'

export const ProductItemService = {
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

  getProductById: async (id: string) => {
    const response = await axiosInstance.get(`${API}/product/${id}`)
    return response
  }
}
