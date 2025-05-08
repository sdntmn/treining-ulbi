import { APP_PATHS } from "shared/const/routes"

export const routePatch = {
  // Основные пути
  main: () => APP_PATHS.MAIN,
  about: () => APP_PATHS.ABOUT,
  forbidden: () => APP_PATHS.FORBIDDEN,
  notFound: () => APP_PATHS.NOT_FOUND,

  // Статьи
  articles: () => APP_PATHS.ARTICLES,
  articleDetails: (id: string) => `${APP_PATHS.ARTICLE_DETAILS}${id}`,
  articleCreate: () => APP_PATHS.ARTICLE_CREATE,
  articleEdit: (id: string) => APP_PATHS.ARTICLE_EDIT.replace(":id", id),

  // Профиль и админка
  profile: (id: string) => `${APP_PATHS.PROFILE}${id}`,
  adminPanel: () => APP_PATHS.ADMIN_PANEL,
} as const
