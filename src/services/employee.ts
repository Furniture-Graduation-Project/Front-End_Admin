import { axiosInstance } from '@/config/axios'
import { IEmployee } from '@/interface/employee'

export const EmployeeService = {
  create: async (data: IEmployee) => {
    try {
      const response = await axiosInstance.post('/employee', data)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  getAll: async () => {
    try {
      const { data } = await axiosInstance.get('/employee')
      return data
    } catch (error) {
      console.log(error)
    }
  },
  getById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/employee')/${id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  update: async (data: IEmployee) => {
    try {
      const response = await axiosInstance.put(`/employee')/${data._id}`, data)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  delete: async (data: IEmployee) => {
    try {
      const response = await axiosInstance.delete(`/employee/${data._id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
