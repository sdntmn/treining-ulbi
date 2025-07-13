// import { AppPathsValues } from "@/shared/const/routes"
// export const APP_PATHS = {
//   MAIN: "/",
//   ABOUT: "/about",
//   PROFILE: "/profile/",
//   ARTICLES: "/articles",
//   ARTICLE_DETAILS: "/articles/", // Для деталей статьи
//   ARTICLE_CREATE: "/articles/new",
//   ARTICLE_EDIT: "/articles/:id/edit",
//   ADMIN_PANEL: "/admin",
//   SETTINGS: "/settings",
//   FORBIDDEN: "/forbidden",
//   NOT_FOUND: "*",
// } as const

// export const routePatch = {
//   // Основные пути
//   main: () => APP_PATHS.MAIN,
//   about: () => APP_PATHS.ABOUT,
//   settings: () => APP_PATHS.SETTINGS,
//   forbidden: () => APP_PATHS.FORBIDDEN,
//   notFound: () => APP_PATHS.NOT_FOUND,

//   // Статьи
//   articles: () => APP_PATHS.ARTICLES,
//   articleDetails: (id: string) => `${APP_PATHS.ARTICLE_DETAILS}${id}`,
//   articleCreate: () => APP_PATHS.ARTICLE_CREATE,
//   articleEdit: (id: string) => APP_PATHS.ARTICLE_EDIT.replace(":id", id),

//   // Профиль и админка
//   profile: (id: string) => `${APP_PATHS.PROFILE}${id}`,
//   adminPanel: () => APP_PATHS.ADMIN_PANEL,
// } as const

// export const AppRouteByPathPattern: Record<string, AppPathsValues> = {
//   [routePatch.main()]: APP_PATHS.MAIN,
//   [routePatch.about()]: APP_PATHS.ABOUT,
//   [routePatch.settings()]: APP_PATHS.SETTINGS,
//   [routePatch.profile(":id")]: APP_PATHS.PROFILE,
//   [routePatch.articles()]: APP_PATHS.ARTICLES,
//   [routePatch.articleDetails(":id")]: APP_PATHS.ARTICLE_DETAILS,
//   [routePatch.articleCreate()]: APP_PATHS.ARTICLE_CREATE,
//   [routePatch.articleEdit(":id")]: APP_PATHS.ARTICLE_EDIT,
//   [routePatch.adminPanel()]: APP_PATHS.ADMIN_PANEL,
//   [routePatch.forbidden()]: APP_PATHS.FORBIDDEN,
//   [routePatch.notFound()]: APP_PATHS.NOT_FOUND,
// }

export enum AppRoutes {
  MAIN = "main",
  SETTINGS = "settings",
  ABOUT = "about",
  PROFILE = "profile",
  ARTICLES = "articles",
  ARTICLE_DETAILS = "article_details",
  ARTICLE_CREATE = "article_create",
  ARTICLE_EDIT = "article_edit",
  ADMIN_PANEL = "admin_panel",
  FORBIDDEN = "forbidden",
  // last
  NOT_FOUND = "not_found",
}

export const getRouteMain = () => "/"
export const getRouteSettings = () => "/settings"
export const getRouteAbout = () => "/about"
export const getRouteProfile = (id: string) => `/profile/${id}`
export const getRouteArticles = () => "/articles"
export const getRouteArticleDetails = (id: string) => `/articles/${id}`
export const getRouteArticleCreate = () => "/articles/new"
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`
export const getRouteAdmin = () => "/admin"
export const getRouteForbidden = () => "/forbidden"

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteSettings()]: AppRoutes.SETTINGS,
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteProfile(":id")]: AppRoutes.PROFILE,
  [getRouteArticles()]: AppRoutes.ARTICLES,
  [getRouteArticleDetails(":id")]: AppRoutes.ARTICLE_DETAILS,
  [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
  [getRouteArticleEdit(":id")]: AppRoutes.ARTICLE_EDIT,
  [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
  [getRouteForbidden()]: AppRoutes.FORBIDDEN,
}
