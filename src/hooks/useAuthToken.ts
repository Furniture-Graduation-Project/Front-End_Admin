import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { isTokenExpired } from '@/utils/tokenUtils'
import { EmployeeService } from '@/services/employee'
import useEmployeeMutation from './mutations/useEmployeeMutation'
import { useNavigate } from 'react-router-dom'

export const useAuthToken = () => {
  const navigate = useNavigate()
  const { token, logout, setToken } = useAuth()
  const { mutate } = useEmployeeMutation({ action: 'LOGOUT' })
  useEffect(() => {
    const refreshAuthToken = async () => {
      if (isTokenExpired(token) && token) {
        console.log(isTokenExpired(token))
        const refreshedToken = await EmployeeService.refreshToken()
        if (refreshedToken) {
          setToken(refreshedToken)
        } else {
          mutate(undefined)
          navigate('/unauthorized', { replace: true })
        }
      }
    }

    refreshAuthToken()
  }, [token, logout])

  return token
}
