import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { AppLink as AppLinkDeprecated } from "@/shared/ui/deprecated/AppLink"
import { AppLink } from "@/shared/ui/redesigned/AppLink"
import { Icon } from "@/shared/ui/redesigned/Icon"

import { getUserAuthData } from "@/entities/User"

import { SidebarItemType } from "../../model/types/sidebar"

import "./SidebarItem.module.scss"

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem: React.FC<SidebarItemProps> = memo(function SidebarItem({
  item,
  collapsed,
}: SidebarItemProps) {
  const { t } = useTranslation("sideBar")
  const isAuth = useSelector(getUserAuthData)
  if (item.authOnly && !isAuth) {
    return null
  }

  return (
    <ToggleFeaturesComponent
      feature={"isAppRedesigned"}
      on={
        <AppLink
          className={cn("sidebar-item-redesign", [collapsed && "sidebar-item-redesign__collapsed"])}
          appLinkColor={"primary"}
          to={item.path}
          activeClassName={"sidebar-item-redesign__active"}
        >
          <Icon Svg={item.Icon} />
          {!collapsed && <span className={"sidebar-item-redesign__link"}>{t(item.text)}</span>}
        </AppLink>
      }
      off={
        <AppLinkDeprecated
          className={cn("sidebar-item", [collapsed && "sidebar-item__collapsed"])}
          appLinkColor={"primary"}
          to={item.path}
        >
          <item.Icon className={"sidebar-item__icon"} />
          {!collapsed && <span className={"sidebar-item__link"}>{t(item.text)}</span>}
        </AppLinkDeprecated>
      }
    />
  )
})
