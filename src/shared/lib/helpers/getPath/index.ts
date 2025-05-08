import { APP_PATHS } from "shared/const/routes"

export const getArticleDetailsPath = (id: string) =>
  `${APP_PATHS.ARTICLE_DETAILS}${id}`
export const getProfilePath = (id: string) => `${APP_PATHS.PROFILE}${id}`

export const routeHelpers = {
  main: () => `${APP_PATHS.MAIN}`,
  forbidden: () => `${APP_PATHS.FORBIDDEN}`,
  create: () => `${APP_PATHS.ARTICLE_CREATE}`,
  adminPanel: () => `${APP_PATHS.ADMIN_PANEL}`,
} as const

export const getArticlesPath = () => APP_PATHS.ARTICLES
export const getArticleEditPath = (id: string) =>
  APP_PATHS.ARTICLE_EDIT.replace(":id", id)
