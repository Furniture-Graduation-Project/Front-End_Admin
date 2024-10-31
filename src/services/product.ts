import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IProduct } from '@/interface/product'
import { AxiosResponse } from 'axios'

const API_URL = '/product'

export const ProductService = {
  getAll: async (): Promise<AxiosResponse<IApiResponse<IProduct[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IProduct[]>> = await axiosInstance.get(API_URL)
      console.log('Dữ liệu sản phẩm từ API:', response.data); 
      return response
    } catch (error) {
      console.error('Lỗi khi lấy tất cả sản phẩm:', error)
      throw error
    }
  },

  getById: async (id: string): Promise<AxiosResponse<IApiResponse<IProduct>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IProduct>> = await axiosInstance.get(`${API_URL}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm với ID ${id}:`, error)
      throw error
    }
  },

  create: async (product: IProduct): Promise<AxiosResponse<IApiResponse<IProduct>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IProduct>> = await axiosInstance.post(API_URL, product)
      return response
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm mới:', error)
      throw error
    }
  },

  update: async (id: string, updatedProduct: IProduct): Promise<AxiosResponse<IApiResponse<IProduct>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IProduct>> = await axiosInstance.put(`${API_URL}/${id}`, updatedProduct)
      return response
    } catch (error) {
      console.error(`Lỗi khi cập nhật sản phẩm với ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string): Promise<AxiosResponse<IApiResponse<void>>> => {
    try {
      const response: AxiosResponse<IApiResponse<void>> = await axiosInstance.delete(`${API_URL}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi xóa sản phẩm với ID ${id}:`, error)
      throw error
    }
  },

  getByStatus: async (status: string): Promise<AxiosResponse<IApiResponse<IProduct[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IProduct[]>> = await axiosInstance.get(`${API_URL}/status/${status}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm theo trạng thái ${status}:`, error)
      throw error
    }
  },

  getLimited: async (pagination: { pageIndex: number; pageSize: number }): Promise<AxiosResponse<IApiResponse<IProduct[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IProduct[]>> = await axiosInstance.get(
        `${API_URL}/limited?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
      )
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm giới hạn:`, error)
      throw error
    }
  },
  getByName: async (name: string): Promise<AxiosResponse<IApiResponse<IProduct[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IProduct[]>> = await axiosInstance.get(`${API_URL}/search`, {
        params: { name }
      });
      return response;
    } catch (error) {
      console.error(`Lỗi khi tìm kiếm sản phẩm theo tên "${name}":`, error);
      throw error;
    }
  },
}
