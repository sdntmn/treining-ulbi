import { getUserAuthData } from "entities/User"
// import { getUserAuthData } from "entities/User"
import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
// import { useSelector } from "react-redux"
import { cn } from "shared/lib/classNames/classNames"
import { AppLink, AppLinkColor } from "shared/ui/AppLink/AppLink"

import { SidebarItemType } from "../../model/items"

import "./SidebarItem.module.scss"

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem: React.FC<SidebarItemProps> = memo(
  function SidebarItem({ item, collapsed }: SidebarItemProps) {
    const { t } = useTranslation("translation")
    const isAuth = useSelector(getUserAuthData)
    if (item.authOnly && !isAuth) {
      return null
    }
    return (
      <AppLink
        className={cn("sidebar-item", [
          collapsed ? "sidebar-item__collapsed" : "",
        ])}
        appLinkColor={AppLinkColor.PRIMARY}
        to={item.path}
      >
        <item.Icon className={"sidebar-item__icon"} />
        <span className={"sidebar-item__link"}>{t(item.text)}</span>
      </AppLink>
    )
  }
)
