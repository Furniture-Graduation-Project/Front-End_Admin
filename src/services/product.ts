import { axiosInstance } from '../config/axios'
import { IProduct } from '../interface/product'

const API_URL = '/products'

export const ProductService = {
  // Lấy tất cả sản phẩm
  getAllProducts: async (): Promise<IProduct[]> => {
    const response = await axiosInstance.get(API_URL)
    return response.data.data
  },

  // Lấy sản phẩm theo ID
  getProductById: async (id: string): Promise<IProduct> => {
    const response = await axiosInstance.get(`${API_URL}/${id}`)
    return response.data
  },

  // Tạo sản phẩm mới
  createProduct: async (product: IProduct): Promise<IProduct> => {
    const response = await axiosInstance.post(API_URL, product)
    return response.data
  },

  // Cập nhật sản phẩm hiện có theo ID
  updateProductById: async (id: string, updatedProduct: IProduct): Promise<IProduct> => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, updatedProduct)
    return response.data
  },

  // Xóa sản phẩm theo ID
  deleteProductById: async (id: string): Promise<IProduct> => {
    const response = await axiosInstance.delete(`${API_URL}/${id}`)
    return response.data
  },

  // Lấy sản phẩm theo danh mục
  getProductsByCategory: async (categoryId: string): Promise<IProduct[]> => {
    const response = await axiosInstance.get(`${API_URL}/category/${categoryId}`)
    return response.data.data
  },

  // Lấy sản phẩm liên quan
  getRelatedProducts: async (categoryId: string, productId: string): Promise<IProduct[]> => {
    const response = await axiosInstance.get(`${API_URL}/related/${categoryId}/${productId}`)
    return response.data
  }
}
