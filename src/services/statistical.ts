import { axiosInstance } from '@/config/axios'
import { IApiResponse } from '@/interface/apiRespose'
import { IChartData } from '@/interface/chartData'
import { AxiosResponse } from 'axios'

const API = '/statistical/from6months'
const API_BIE_CHART = '/statistical/from6monthsBieChart'
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
  }

}
