import { ReactNode, useMemo } from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

import { routePatch } from "@/shared/lib/helpers/getPath"

import { getUserAuthData, getUserRoles, UserRole } from "@/entities/User"

interface RequireAuthProps {
  children: ReactNode
  roles?: UserRole[]
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const auth = useSelector(getUserAuthData)
  const userRoles = useSelector(getUserRoles)

  const location = useLocation()

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true
    }

    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole)
      return hasRole
    })
  }, [roles, userRoles])

  if (!auth) {
    return (
      <Navigate to={routePatch.main()} state={{ from: location }} replace />
    )
  }

  if (!hasRequiredRoles) {
    return (
      <Navigate
        to={routePatch.forbidden()}
        state={{ from: location }}
        replace
      />
    )
  }

  return children
}
