// export const MAIN_PATH = "/"
// export const ABOUT_PATH = "/about"
// export const PROFILE_PATH = "/profile/"
// export const ARTICLES_PATH = "/articles"
// export const ARTICLE_DETAILS_PATH = "/articles/"
// export const ARTICLE_CREATE_PATH = "/articles/new"
// export const ARTICLE_EDIT_PATH = "/articles/:id/edit"
// export const ADMIN_PANEL_PATH = "/admin"
// export const FORBIDDEN_PATH = "/forbidden"
// export const NOT_FOUND_PATH = "*"

export const APP_PATHS = {
  MAIN: "/",
  ABOUT: "/about",
  PROFILE: "/profile/",
  ARTICLES: "/articles",
  ARTICLE_DETAILS: "/articles/", // Для деталей статьи
  ARTICLE_CREATE: "/articles/new",
  ARTICLE_EDIT: "/articles/:id/edit",
  ADMIN_PANEL: "/admin",
  FORBIDDEN: "/forbidden",
  NOT_FOUND: "*",
} as const
