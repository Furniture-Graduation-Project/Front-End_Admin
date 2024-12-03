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