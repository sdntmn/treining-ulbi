import { RouteNames, UserRole } from "../const/enums"

import type { RouteProps } from "react-router-dom"

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}

export type RoutePaths = Record<RouteNames, string>
