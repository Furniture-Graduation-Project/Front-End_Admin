// components/ProtectedRoute.tsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { checkPermissions } from '@/utils/checkPermissions'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const hasPermission = checkPermissions(requiredRole)

  return hasPermission ? <>{children}</> : <Navigate to='/unauthorized' replace />
}
