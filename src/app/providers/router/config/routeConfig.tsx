import { UserRole } from "@/shared/const/enums"
import {
  AppRoutes,
  getRouteAbout,
  getRouteAdmin,
  getRouteArticleCreate,
  getRouteArticleDetails,
  getRouteArticleEdit,
  getRouteArticles,
  getRouteForbidden,
  getRouteMain,
  getRouteProfile,
  getRouteSettings,
} from "@/shared/const/routes"

import { AboutPageAsync } from "@/pages/AboutPage"
import { AdminPanelPage } from "@/pages/AdminPanelPage"
import { ArticleEditPage } from "@/pages/ArticleEditPage"
import { ArticleDetailsPage } from "@/pages/ArticlesDetailsPage"
import { ArticlesPageAsync } from "@/pages/ArticlesPage"
import { ForbiddenPage } from "@/pages/ForbiddenPage"
import { MainPage } from "@/pages/MainPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ProfilePage } from "@/pages/ProfilePage"
import { SettingsPage } from "@/pages/SettingsPage"

import type { AppRoutesProps } from "@/shared/types/routerType"

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: { path: getRouteMain(), element: <MainPage /> },
  [AppRoutes.SETTINGS]: { path: getRouteSettings(), element: <SettingsPage /> },
  [AppRoutes.ABOUT]: { path: getRouteAbout(), element: <AboutPageAsync /> },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(":id"),
    element: <ProfilePage />,
    authOnly: true,
  },

  [AppRoutes.ARTICLES]: {
    path: getRouteArticles(),
    element: <ArticlesPageAsync />,
    authOnly: true,
  },

  [AppRoutes.ARTICLE_DETAILS]: {
    path: getRouteArticleDetails(":id"),
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: getRouteArticleCreate(),
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: getRouteArticleEdit(":id"),
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: getRouteAdmin(),
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  [AppRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: "*",
    element: <NotFoundPage />,
  },
}
