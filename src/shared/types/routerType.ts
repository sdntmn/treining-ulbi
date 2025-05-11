import type { RouteProps } from "react-router-dom"

import { UserRole } from "@/entities/User"

import { RouteNames } from "../const/enums"

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}

export type RoutePaths = Record<RouteNames, string>
