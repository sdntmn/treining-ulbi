/* eslint-disable i18next/no-literal-string */
import React, { memo, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { routePatch } from "@/shared/lib/helpers/getPath"
import { AppLink } from "@/shared/ui/deprecated/AppLink"
import { Button, ButtonVar } from "@/shared/ui/deprecated/Button"
import { TextParagraf, TextVar } from "@/shared/ui/deprecated/TextParagraf"
import { HStack } from "@/shared/ui/redesigned/Stack"

import { getUserAuthData } from "@/entities/User"

import { LoginModal } from "@/features/AuthByUserName"
import { AvatarDropdown } from "@/features/AvatarDropdown"
import { ButtonNotification } from "@/features/ButtonNotification"

import "./Navbar.module.scss"

interface NavbarProps {
  className?: string
}

export const Navbar: React.FC<NavbarProps> = memo(function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation("common")
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false)

  const authData = useSelector(getUserAuthData)

  const onCloseModalAuth = useCallback(() => setIsAuthModal(false), [])
  const onOpenModalAuth = useCallback(() => setIsAuthModal(true), [])

  if (authData) {
    return (
      <ToggleFeaturesComponent
        feature={"isAppRedesigned"}
        on={
          <header className={cn("navbar-redesigned", [className])}>
            <HStack gap="16" className="navbar-redesigned__actions">
              <ButtonNotification />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={cn("navbar", [className])}>
            <TextParagraf className="navbar-name" title={t("SDN")} textVar={TextVar.PRIMARY} />

            <AppLink
              to={routePatch.articleCreate()}
              appLinkColor={"secondary"}
              className="navbar__create-btn"
            >
              {t("Создать статью")}
            </AppLink>
            <HStack gap="16" className="navbar__actions">
              <ButtonNotification className="navbar__notification" />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    )
  }

  return (
    <div className={cn("navbar", [className])}>
      <Button className="navbar__login" buttonVar={ButtonVar.CLEAR} onClick={onOpenModalAuth}>
        {t("login")}
      </Button>
      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModalAuth} />}
    </div>
  )
})
