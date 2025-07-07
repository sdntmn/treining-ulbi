import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { routePatch } from "@/shared/lib/helpers/getPath"
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar"
import { Dropdown as DropdownDeprecated } from "@/shared/ui/deprecated/Popups"
import { Avatar } from "@/shared/ui/redesigned/Avatar"
import { Dropdown } from "@/shared/ui/redesigned/Popups"

import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "@/entities/User"

interface AvatarDropdownProps {
  className?: string
}

export const AvatarDropdown: React.FC<AvatarDropdownProps> = memo((props: AvatarDropdownProps) => {
  const { className } = props
  const { t } = useTranslation("common")
  const dispatch = useDispatch()
  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)
  const authData = useSelector(getUserAuthData)

  const onLogout = useCallback(() => dispatch(userActions.logOut()), [dispatch])

  const isAdminPanelAvailable = isAdmin || isManager
  if (!authData) {
    return null
  }

  const items = [
    ...(isAdminPanelAvailable ? [{ content: t("menuAdmin"), href: routePatch.adminPanel() }] : []),
    { content: t("menuProfile"), href: routePatch.profile(authData.id) },
    { content: t("goOut"), onClick: onLogout },
  ]

  return (
    <ToggleFeaturesComponent
      feature={"isAppRedesigned"}
      on={
        <Dropdown
          direction="bottom left"
          className={cn("navbar__login", [className])}
          items={items}
          trigger={<Avatar size={48} src={authData.avatar} />}
        />
      }
      off={
        <DropdownDeprecated
          direction="bottom left"
          className={cn("navbar__login", [className])}
          items={items}
          trigger={<AvatarDeprecated fallbackInverted size={30} src={authData.avatar} />}
        />
      }
    ></ToggleFeaturesComponent>
  )
})

AvatarDropdown.displayName = "AvatarDropdown"
