import { AboutPage } from "pages/AboutPage"
import { ArticleDetailsPage } from "pages/ArticlesDetailsPage"
import { ArticlesPage } from "pages/ArticlesPage"
import { MainPage } from "pages/MainPage"
import { NotFoundPage } from "pages/NotFoundPage"
import { ProfilePage } from "pages/ProfilePage"
import React from "react"
import { type RouteProps } from "react-router-dom"

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
}
export enum RouteNames {
  MAIN = "main",
  ABOUT = "about",
  PROFILE = "profile",
  ARTICLES = "articles",
  ARTICLE_DETAILS = "article_details",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<RouteNames, string> = {
  [RouteNames.MAIN]: "/",
  [RouteNames.ABOUT]: "/about",
  [RouteNames.PROFILE]: "/profile/",
  [RouteNames.ARTICLES]: "/articles",
  [RouteNames.ARTICLE_DETAILS]: "/articles/",
  [RouteNames.NOT_FOUND]: "*",
}

export const routeConfig: Record<RouteNames, AppRoutesProps> = {
  [RouteNames.MAIN]: { path: RoutePath.main, element: <MainPage /> },
  [RouteNames.ABOUT]: { path: RoutePath.about, element: <AboutPage /> },
  [RouteNames.PROFILE]: {
    path: `${RoutePath.profile}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },

  [RouteNames.ARTICLES]: {
    path: RoutePath.articles,
    element: <ArticlesPage />,
    authOnly: true,
  },

  [RouteNames.ARTICLE_DETAILS]: {
    path: `${RoutePath.article_details}:id`,
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [RouteNames.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
}
