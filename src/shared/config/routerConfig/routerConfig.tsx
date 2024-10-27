import { AboutPage } from "pages/AboutPage"
import { MainPage } from "pages/MainPage"
import { NotFoundPage } from "pages/NotFoundPage"
import React from "react"
import { type RouteProps } from "react-router-dom"

export enum RouteNames {
  Main = "main",
  About = "about",
  NotFound = "not_found",
}

export const RouterPath: Record<RouteNames, string> = {
  [RouteNames.Main]: "/",
  [RouteNames.About]: "/about",
  [RouteNames.NotFound]: "*",
}

export const routerConfig: Record<RouteNames, RouteProps> = {
  [RouteNames.Main]: { path: RouterPath.main, element: <MainPage /> },
  [RouteNames.About]: { path: RouterPath.about, element: <AboutPage /> },
  [RouteNames.NotFound]: {
    path: RouterPath.not_found,
    element: <NotFoundPage />,
  },
}
