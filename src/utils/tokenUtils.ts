import { axiosInstance } from '@/config/axios'
import { jwtDecode } from 'jwt-decode'

export function isTokenExpired(token: string | null): boolean {
  if (!token) return true
  try {
    const decoded = jwtDecode<{ exp: number }>(token)
    return decoded.exp * 1000 < Date.now()
  } catch (e) {
    return true
  }
}

export async function refreshToken(logout: () => void): Promise<string | null> {
  try {
    const response = await axiosInstance.post('/employee/refreshToken')
    if (!response) {
      throw new Error('Không thể làm mới access token')
    }
    const data = response.data
    return data.token
  } catch (error) {
    console.error('Không thể làm mới access token:', error)
    logout()
    return null
  }
}
