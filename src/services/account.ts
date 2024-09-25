import { axiosInstance } from '@/config/axios'
import { IUser } from '@/interface/account'

export const AccountService = {
  signIn: async (data: IUser) => {
    try {
      const response = await axiosInstance.post('/signin', data)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  signUp: async (data: IUser) => {
    try {
      const response = await axiosInstance.post('/signup', data)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/users')
      return response
    } catch (error) {
      console.log(error)
    }
  },
  getById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/users/${id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  delete: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/users/${id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
