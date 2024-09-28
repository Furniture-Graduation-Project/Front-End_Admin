import { axiosInstance } from '@/config/axios'
import { IPromotion } from '@/interface/promotion'

export const PromotionService = {
  getAllPromotions: async () => {
    try {
      const response = await axiosInstance.get('/promotions')
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  getPromotionById: async (promotionId: string) => {
    try {
      const response = await axiosInstance.get(`/promotions/${promotionId}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  addPromotion: async (data: IPromotion) => {
    try {
      const response = await axiosInstance.post('/promotions', data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  updatePromotion: async (promotionId: string, data: IPromotion) => {
    try {
      const response = await axiosInstance.put(`/promotions/${promotionId}`, data)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  deletePromotion: async (promotionId: string) => {
    try {
      const response = await axiosInstance.delete(`/promotions/${promotionId}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
