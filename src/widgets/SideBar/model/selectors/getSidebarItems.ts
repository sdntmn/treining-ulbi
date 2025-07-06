import { createSelector } from "@reduxjs/toolkit"

import AboutIconDeprecated from "@/shared/assets/icons/about-page.svg"
import ArticleIcon from "@/shared/assets/icons/article-view.svg"
import ArticleIconDeprecated from "@/shared/assets/icons/article.svg"
import ProfileIcon from "@/shared/assets/icons/avatar.svg"
import MainIcon from "@/shared/assets/icons/home.svg"
import AboutIcon from "@/shared/assets/icons/Info.svg"
import MainIconDeprecated from "@/shared/assets/icons/main-page.svg"
import ProfileIconDeprecated from "@/shared/assets/icons/profile-page.svg"
import { APP_PATHS } from "@/shared/const/routes"
import { toggleFeatures } from "@/shared/lib/features"
import { routePatch } from "@/shared/lib/helpers/getPath"

import { getUserAuthData } from "@/entities/User"

import { SidebarItemType } from "../types/sidebar"

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: APP_PATHS.MAIN,
      Icon: toggleFeatures({
        name: "isAppRedesigned",
        on: () => MainIcon,
        off: () => MainIconDeprecated,
      }),
      text: "navLinkMain",
    },
    {
      path: APP_PATHS.ABOUT,
      Icon: toggleFeatures({
        name: "isAppRedesigned",
        on: () => AboutIcon,
        off: () => AboutIconDeprecated,
      }),
      text: "navLinkAbout",
    },
  ]
  if (userData) {
    sidebarItemsList.push(
      {
        path: routePatch.profile(userData.id),
        Icon: toggleFeatures({
          name: "isAppRedesigned",
          on: () => ProfileIcon,
          off: () => ProfileIconDeprecated,
        }),
        text: "navLinkProfile",
        authOnly: true,
      },
      {
        path: APP_PATHS.ARTICLES,
        Icon: toggleFeatures({
          name: "isAppRedesigned",
          on: () => ArticleIcon,
          off: () => ArticleIconDeprecated,
        }),
        text: "navLinkArticles",
        authOnly: true,
      }
    )
  }
  return sidebarItemsList
})
