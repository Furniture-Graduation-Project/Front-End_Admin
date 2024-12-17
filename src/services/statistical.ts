import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IChartData } from '@/interface/chartData'
import { IProduct } from '@/interface/product'
import { AxiosResponse } from 'axios'

const API = '/statistical/from6months'
const API_BIE_CHART = '/statistical/from6monthsBieChart'
const API_TOP_PRODUCTS = '/statistical/top5Products'

export const StatisticalService = {
  getAll: async (): Promise<AxiosResponse<IApiResponse<IChartData[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IChartData[]>> = await axiosInstance.get(API)
      return response
    } catch (error) {
      console.error('Lỗi:', error)
      throw error
    }
  },

  getBieChart: async (): Promise<AxiosResponse<IApiResponse<IChartData[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IChartData[]>> = await axiosInstance.get(API_BIE_CHART)
      return response
    } catch (error) {
      console.error('Lỗi:', error)
      throw error
    }
  },

  getTopProducts: async (): Promise<AxiosResponse<IApiResponse<IProduct[]>>> => {
    try {
      const response: AxiosResponse<IApiResponse<IProduct[]>> = await axiosInstance.get(API_TOP_PRODUCTS)
      return response
    } catch (error) {
      console.error('Lỗi:', error)
      throw error
    }
  }

}
