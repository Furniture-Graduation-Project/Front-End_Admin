import { createContext, useContext, ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'
import useLocalStorage from '@/hooks/useLocalStorage'
interface AuthContextType {
  userId: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const getUserIdFromToken = (token: string | null): string | null => {
  if (!token) return null
  try {
    const decoded = jwtDecode<{ userId: string }>(token)
    return decoded.userId
  } catch (error) {
    console.error('Token không hợp lệ:', error)
    return null
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser, removeUser] = useLocalStorage('user', null)
  const login = (token: string) => setUser(token)
  const logout = () => removeUser()
  const userId = getUserIdFromToken(user)
  return <AuthContext.Provider value={{ userId, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('AuthContext phải được sử dụng trong AuthProvider')
  }
  return context
}
