import { useAuth } from '@/context/AuthContext'

const useCheckPermissions = (requiredRoles: string[]): boolean => {
  const { user } = useAuth()
  const userRole = user?.role

  if (!userRole) return false

  return requiredRoles.includes(userRole)
}
export default useCheckPermissions
