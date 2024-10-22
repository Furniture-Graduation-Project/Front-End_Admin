import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IEmployee } from '@/interface/employee'
import { AxiosResponse } from 'axios'

const API = 'employee'

export const EmployeeService = {
  create: async (data: IEmployee): Promise<AxiosResponse<IApiResponse<IEmployee>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IEmployee>> = await axiosInstance.post(API, data)
      return response
    } catch (error) {
      console.error('Lỗi khi tạo nhân viên mới:', error)
      throw error
    }
  },

  getAll: async (): Promise<AxiosResponse<IApiResponse<IEmployee[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IEmployee[]>> = await axiosInstance.get(API)
      return response
    } catch (error) {
      console.error('Lỗi khi lấy tất cả nhân viên:', error)
      throw error
    }
  },

  getById: async (id: string): Promise<AxiosResponse<IApiResponse<IEmployee>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IEmployee>> = await axiosInstance.get(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy nhân viên với ID ${id}:`, error)
      throw error
    }
  },

  update: async (id: string, data: Partial<IEmployee>): Promise<AxiosResponse<IApiResponse<IEmployee>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IEmployee>> = await axiosInstance.put(`${API}/${id}`, data)
      return response
    } catch (error) {
      console.error(`Lỗi khi cập nhật nhân viên với ID ${id}:`, error)
      throw error
    }
  },

  delete: async (id: string): Promise<AxiosResponse<IApiResponse<void>>> => {
    try {
      const response: AxiosResponse<IApiResponse<void>> = await axiosInstance.delete(`${API}/${id}`)
      return response
    } catch (error) {
      console.error(`Lỗi khi xóa nhân viên với ID ${id}:`, error)
      throw error
    }
  },

  signIn: async (username: string, password: string): Promise<AxiosResponse<IApiResponse<IEmployee>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IEmployee>> = await axiosInstance.post(`${API}/signin`, {
        username,
        password
      })
      return response
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error)
      throw error
    }
  },

  getLimited: async (pagination: {
    pageIndex: number
    pageSize: number
  }): Promise<AxiosResponse<IApiResponse<IEmployee[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IEmployee[]>> = await axiosInstance.get(
        `${API}/limited?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
      )
      return response
    } catch (error) {
      console.error(`Lỗi khi lấy danh sách:`, error)
      throw error
    }
  },

  // Phương thức mới để tìm kiếm theo fullName
  getByFullName: async (fullName: string): Promise<AxiosResponse<IApiResponse<IEmployee[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IEmployee[]>> = await axiosInstance.get(
        `${API}/search?fullName=${fullName}`
      )
      return response
    } catch (error) {
      console.error(`Lỗi khi tìm kiếm nhân viên theo tên:`, error)
      throw error
    }
  }
}
