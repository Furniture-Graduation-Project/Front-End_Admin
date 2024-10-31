import useSessionStorage from '@/hooks/useSessionStorage'
import { createContext, useContext, ReactNode } from 'react'

interface AuthContextType {
  user: string | null
  login: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser, removeUser] = useSessionStorage('user', null)
  const login = (username: string) => setUser(username)
  const logout = () => removeUser()

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
