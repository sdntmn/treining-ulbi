import React from "react"

import { UserRole } from "@/entities/User"
import { AboutPageAsync } from "@/pages/AboutPage"
import { AdminPanelPage } from "@/pages/AdminPanelPage"
import { ArticleEditPage } from "@/pages/ArticleEditPage"
import { ArticleDetailsPageAsync } from "@/pages/ArticlesDetailsPage"
import { ArticlesPageAsync } from "@/pages/ArticlesPage"
import { ForbiddenPage } from "@/pages/ForbiddenPage"
import { MainPage } from "@/pages/MainPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ProfilePage } from "@/pages/ProfilePage"
import { APP_PATHS } from "@/shared/const/routes"

import { RouteNames } from "../../const/enums"
import { AppRoutesProps } from "../../types/routerType"

// export const RoutePath: Record<RouteNames, string> = {
//   [RouteNames.MAIN]: MAIN_PATH,
//   [RouteNames.ABOUT]: ABOUT_PATH,
//   [RouteNames.PROFILE]: PROFILE_PATH,
//   [RouteNames.ARTICLES]: ARTICLES_PATH,
//   [RouteNames.ARTICLE_DETAILS]: ARTICLE_DETAILS_PATH,
//   [RouteNames.ARTICLE_CREATE]: ARTICLE_CREATE_PATH,
//   [RouteNames.ARTICLE_EDIT]: ARTICLE_EDIT_PATH,
//   [RouteNames.ADMIN_PANEL]: ADMIN_PANEL_PATH,
//   [RouteNames.FORBIDDEN]: FORBIDDEN_PATH,
//   [RouteNames.NOT_FOUND]: NOT_FOUND_PATH,
// }

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
