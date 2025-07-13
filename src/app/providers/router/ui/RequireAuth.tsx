import { useMemo } from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

import { UserRole } from "@/shared/const/enums"
import { getRouteForbidden, getRouteMain } from "@/shared/lib/helpers/getPath"

import { getUserAuthData, getUserRoles } from "@/entities/User"

interface RequireAuthProps {
  children: JSX.Element
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
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />
  }

  if (!hasRequiredRoles) {
    return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />
  }

  return children
}
