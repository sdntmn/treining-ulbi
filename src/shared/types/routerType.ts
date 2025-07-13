import { UserRole } from "../const/enums"
import { AppRoutes } from "../const/routes"

import type { RouteProps } from "react-router-dom"

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}

export type RoutePaths = Record<AppRoutes, string>
