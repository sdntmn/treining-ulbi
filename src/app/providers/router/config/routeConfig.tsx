import React from "react"

import { RouteNames, UserRole } from "@/shared/const/enums"
import { APP_PATHS } from "@/shared/const/routes"
import { AppRoutesProps } from "@/shared/types/routerType"

import { AboutPageAsync } from "@/pages/AboutPage"
import { AdminPanelPage } from "@/pages/AdminPanelPage"
import { ArticleEditPage } from "@/pages/ArticleEditPage"
import { ArticleDetailsPageAsync } from "@/pages/ArticlesDetailsPage"
import { ArticlesPageAsync } from "@/pages/ArticlesPage"
import { ForbiddenPage } from "@/pages/ForbiddenPage"
import { MainPage } from "@/pages/MainPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ProfilePage } from "@/pages/ProfilePage"

export const routeConfig: Record<RouteNames, AppRoutesProps> = {
  [RouteNames.MAIN]: { path: APP_PATHS.MAIN, element: <MainPage /> },
  [RouteNames.ABOUT]: { path: APP_PATHS.ABOUT, element: <AboutPageAsync /> },
  [RouteNames.PROFILE]: {
    path: `${APP_PATHS.PROFILE}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },

  [RouteNames.ARTICLES]: {
    path: APP_PATHS.ARTICLES,
    element: <ArticlesPageAsync />,
    authOnly: true,
  },

  [RouteNames.ARTICLE_DETAILS]: {
    path: `${APP_PATHS.ARTICLE_DETAILS}:id`,
    element: <ArticleDetailsPageAsync />,
    authOnly: true,
  },
  [RouteNames.ARTICLE_CREATE]: {
    path: `${APP_PATHS.ARTICLE_CREATE}`,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [RouteNames.ARTICLE_EDIT]: {
    path: `${APP_PATHS.ARTICLE_EDIT}`,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [RouteNames.ADMIN_PANEL]: {
    path: `${APP_PATHS.ADMIN_PANEL}`,
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  [RouteNames.FORBIDDEN]: {
    path: `${APP_PATHS.FORBIDDEN}`,
    element: <ForbiddenPage />,
  },
  [RouteNames.NOT_FOUND]: {
    path: APP_PATHS.NOT_FOUND,
    element: <NotFoundPage />,
  },
}
