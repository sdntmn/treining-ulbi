import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "entities/User"
import { LoginModal } from "features/AuthByUserName"
import React, { memo, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { AppLinkColor } from "shared/const/enums"
import { cn } from "shared/lib/classNames/classNames"
import { routePatch } from "shared/lib/helpers/getPath"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { AppLink } from "shared/ui/AppLink"
import { Avatar } from "shared/ui/Avatar/Avatar"
import { Button, ButtonVar } from "shared/ui/Button/Button"
import { Dropdown } from "shared/ui/Dropdown/Dropdown"
import { TextParagraf, TextVar } from "shared/ui/TextParagraf/TextParagraf"

import "./Navbar.module.scss"

interface NavbarProps {
  className?: string
}

export const Navbar: React.FC<NavbarProps> = memo(function Navbar({
  className,
}: NavbarProps) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation("common")
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false)

  const authData = useSelector(getUserAuthData)
  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)

  const onCloseModalAuth = useCallback(() => setIsAuthModal(false), [])
  const onOpenModalAuth = useCallback(() => setIsAuthModal(true), [])
  const onLogout = useCallback(() => dispatch(userActions.logOut()), [dispatch])

  const isAdminPanelAvailable = isAdmin || isManager

  if (authData) {
    return (
      <header className={cn("navbar", [className])}>
        <TextParagraf
          className="navbar-name"
          title={t("SDN")}
          textVar={TextVar.PRIMARY}
        />

        <AppLink
          to={routePatch.articleCreate()}
          appLinkColor={AppLinkColor.SECONDARY}
          className="navbar__create-btn"
        >
          {t("Создать статью")}
        </AppLink>

        <Dropdown
          direction="bottom left"
          className="navbar__login"
          items={[
            ...(isAdminPanelAvailable
              ? [{ content: t("Админка"), href: routePatch.adminPanel() }]
              : []),
            { content: t("Профиль"), href: routePatch.profile(authData.id) },
            { content: t("Выйти"), onClick: onLogout },
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
        />
      </header>
    )
  }

  return (
    <div className={cn("navbar", [className])}>
      <Button
        className="navbar__login"
        buttonVar={ButtonVar.CLEAR}
        onClick={onOpenModalAuth}
      >
        {t("login")}
      </Button>
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModalAuth} />
      )}
    </div>
  )
})
