import { axiosInstance } from '../config/axios'
import { ICategory } from '../interface/category'

const API_URL = '/categories'

export const CategoryService = {
  // Lấy tất cả danh mục
  getAllCategories: async (): Promise<ICategory[]> => {
    const response = await axiosInstance.get(API_URL)
    return response.data
  },

  // Lấy danh mục theo ID
  getCategoryById: async (id: string): Promise<ICategory> => {
    const response = await axiosInstance.get(`${API_URL}/${id}`)
    return response.data
  },

  // Tạo mới danh mục
  createCategory: async (category: ICategory): Promise<ICategory> => {
    const response = await axiosInstance.post(API_URL, category)
    return response.data
  },

  // Cập nhật danh mục theo ID
  updateCategoryById: async (id: string, updatedCategory: ICategory): Promise<ICategory> => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, updatedCategory)
    return response.data
  },

  // Xóa danh mục theo ID và chuyển sản phẩm về danh mục có role = 1
  deleteCategoryById: async (id: string): Promise<ICategory> => {
    const response = await axiosInstance.delete(`${API_URL}/${id}`, {
      data: { moveProducts: true } // Gửi yêu cầu để chuyển sản phẩm
    })
    return response.data
  }
}
