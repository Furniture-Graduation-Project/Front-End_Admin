import { axiosInstance } from '../config/axios'
import { IReview } from '../interface/review'

const API_URL = '/reviews'

export const ReviewService = {
  // Lấy tất cả review
  getAllReviews: async (): Promise<IReview[]> => {
    const response = await axiosInstance.get(API_URL)
    return response.data.data
  },

  // Lấy review theo ID
  getReviewById: async (id: string): Promise<IReview> => {
    const response = await axiosInstance.get(`${API_URL}/${id}`)
    return response.data
  },

  // Tạo review mới
  createReview: async (review: IReview): Promise<IReview> => {
    const response = await axiosInstance.post(API_URL, review)
    return response.data
  },

  // Cập nhật review theo ID
  updateReviewById: async (id: string, updatedReview: IReview): Promise<IReview> => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, updatedReview)
    return response.data
  },

  // Xóa review theo ID
  deleteReviewById: async (id: string): Promise<IReview> => {
    const response = await axiosInstance.delete(`${API_URL}/${id}`)
    return response.data
  },

  // Lấy review theo ID sản phẩm
  getReviewsByProductId: async (productId: string): Promise<IReview[]> => {
    const response = await axiosInstance.get(`${API_URL}/product/${productId}`)
    return response.data.data
  }
}
