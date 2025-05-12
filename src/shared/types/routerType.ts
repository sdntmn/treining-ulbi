import type { RouteProps } from "react-router-dom"

import { RouteNames, UserRole } from "../const/enums"

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}

export type RoutePaths = Record<RouteNames, string>
