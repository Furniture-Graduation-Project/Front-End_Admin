export const checkPermissions = (requiredRoles: string[]): boolean => {
  const userData = sessionStorage.getItem('userData')
  if (!userData) return false

  const parsedData = JSON.parse(userData)
  const userRole = parsedData.role

  return requiredRoles.includes(userRole)
}
