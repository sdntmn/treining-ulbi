import { AboutPage } from "pages/AboutPage"
import { MainPage } from "pages/MainPage"
import { NotFoundPage } from "pages/NotFoundPage"
import { ProfilePage } from "pages/ProfilePage"
import React from "react"
import { type RouteProps } from "react-router-dom"

type AppRoutesProps = RouteProps & {
  authOnly?: boolean
}
export enum RouteNames {
  MAIN = "main",
  ABOUT = "about",
  PROFILE = "profile",
  NOT_FOUND = "not_found",
}

export const RouterPath: Record<RouteNames, string> = {
  [RouteNames.MAIN]: "/",
  [RouteNames.ABOUT]: "/about",
  [RouteNames.PROFILE]: "/profile",
  [RouteNames.NOT_FOUND]: "*",
}

export const routerConfig: Record<RouteNames, AppRoutesProps> = {
  [RouteNames.MAIN]: { path: RouterPath.main, element: <MainPage /> },
  [RouteNames.ABOUT]: { path: RouterPath.about, element: <AboutPage /> },
  [RouteNames.PROFILE]: {
    path: RouterPath.profile,
    element: <ProfilePage />,
    authOnly: true,
  },
  [RouteNames.NOT_FOUND]: {
    path: RouterPath.not_found,
    element: <NotFoundPage />,
  },
}
