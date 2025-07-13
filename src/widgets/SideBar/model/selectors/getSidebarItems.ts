import { createSelector } from "@reduxjs/toolkit"

import AboutIconDeprecated from "@/shared/assets/icons/about-page.svg"
import ArticleIcon from "@/shared/assets/icons/article-view.svg"
import ArticleIconDeprecated from "@/shared/assets/icons/article.svg"
import ProfileIcon from "@/shared/assets/icons/avatar.svg"
import MainIcon from "@/shared/assets/icons/home.svg"
import AboutIcon from "@/shared/assets/icons/Info.svg"
import MainIconDeprecated from "@/shared/assets/icons/main-page.svg"
import ProfileIconDeprecated from "@/shared/assets/icons/profile-page.svg"
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from "@/shared/const/routes"
import { toggleFeatures } from "@/shared/lib/features"

import { getUserAuthData } from "@/entities/User"

import { SidebarItemType } from "../types/sidebar"

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: toggleFeatures({
        name: "isAppRedesigned",
        on: () => MainIcon,
        off: () => MainIconDeprecated,
      }),
      text: "navLinkMain",
    },
    {
      path: getRouteAbout(),
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
        path: getRouteProfile(userData.id),
        Icon: toggleFeatures({
          name: "isAppRedesigned",
          on: () => ProfileIcon,
          off: () => ProfileIconDeprecated,
        }),
        text: "navLinkProfile",
        authOnly: true,
      },
      {
        path: getRouteArticles(),
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
