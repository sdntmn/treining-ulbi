import { UserRole } from "entities/User"
import { AboutPage } from "pages/AboutPage"
import { AdminPanelPage } from "pages/AdminPanelPage"
import { ArticleEditPage } from "pages/ArticleEditPage"
import { ArticleDetailsPage } from "pages/ArticlesDetailsPage"
import { ArticlesPage } from "pages/ArticlesPage"
import { ForbiddenPage } from "pages/ForbiddenPage"
import { MainPage } from "pages/MainPage"
import { NotFoundPage } from "pages/NotFoundPage"
import { ProfilePage } from "pages/ProfilePage"
import React from "react"
import { type RouteProps } from "react-router-dom"

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}
export enum RouteNames {
  MAIN = "main",
  ABOUT = "about",
  PROFILE = "profile",
  ARTICLES = "articles",
  ARTICLE_DETAILS = "article_details",
  ARTICLE_CREATE = "article_create",
  ARTICLE_EDIT = "article_edit",
  ADMIN_PANEL = "admin_panel",
  FORBIDDEN = "forbidden",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<RouteNames, string> = {
  [RouteNames.MAIN]: "/",
  [RouteNames.ABOUT]: "/about",
  [RouteNames.PROFILE]: "/profile/",
  [RouteNames.ARTICLES]: "/articles",
  [RouteNames.ARTICLE_DETAILS]: "/articles/",
  [RouteNames.ARTICLE_CREATE]: "/articles/new",
  [RouteNames.ARTICLE_EDIT]: "/articles/:id/edit",
  [RouteNames.NOT_FOUND]: "*",
  [RouteNames.ADMIN_PANEL]: "/admin",
  [RouteNames.FORBIDDEN]: "/forbidden",
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
  [RouteNames.ARTICLE_CREATE]: {
    path: `${RoutePath.article_create}`,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [RouteNames.ARTICLE_EDIT]: {
    path: `${RoutePath.article_edit}`,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [RouteNames.ADMIN_PANEL]: {
    path: `${RoutePath.admin_panel}`,
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  [RouteNames.FORBIDDEN]: {
    path: `${RoutePath.forbidden}`,
    element: <ForbiddenPage />,
  },
  [RouteNames.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
}
