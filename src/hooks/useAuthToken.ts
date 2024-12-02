import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { isTokenExpired, refreshToken } from '@/utils/tokenUtils'

export const useAuthToken = () => {
  const { token, logout, setToken } = useAuth()
  useEffect(() => {
    const refreshAuthToken = async () => {
      if (isTokenExpired(token)) {
        console.log(isTokenExpired(token))
        const refreshedToken = await refreshToken(logout)
        if (refreshedToken) {
          setToken(refreshedToken)
        }
      }
    }

    refreshAuthToken()
  }, [token, logout])

  return token
}
