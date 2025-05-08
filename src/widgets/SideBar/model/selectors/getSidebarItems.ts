import { createSelector } from "@reduxjs/toolkit"
import { getUserAuthData } from "entities/User"
import AboutIcon from "shared/assets/icons/about-page.svg"
import ArticleIcon from "shared/assets/icons/article.svg"
import MainIcon from "shared/assets/icons/main-page.svg"
import ProfileIcon from "shared/assets/icons/profile-page.svg"
import { APP_PATHS } from "shared/const/routes"
import { routePatch } from "shared/lib/helpers/getPath"

import { SidebarItemType } from "../types/sidebar"

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: APP_PATHS.MAIN,
      Icon: MainIcon,
      text: "Главная",
    },
    {
      path: APP_PATHS.ABOUT,
      Icon: AboutIcon,
      text: "О нас",
    },
  ]
  if (userData) {
    sidebarItemsList.push(
      {
        path: routePatch.profile(userData.id),
        Icon: ProfileIcon,
        text: "Профиль",
        authOnly: true,
      },
      {
        path: APP_PATHS.ARTICLES,
        Icon: ArticleIcon,
        text: "Статьи",
        authOnly: true,
      }
    )
  }
  return sidebarItemsList
})
