/* eslint-disable i18next/no-literal-string */
import React, { memo, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { cn } from "@/shared/lib/classNames/classNames"
import { toggleFeatures, ToggleFeaturesComponent } from "@/shared/lib/features"
import { routePatch } from "@/shared/lib/helpers/getPath"
import { AppLink } from "@/shared/ui/deprecated/AppLink"
import { Button as ButtonDeprecated, ButtonVar } from "@/shared/ui/deprecated/Button"
import { TextParagraf, TextVar } from "@/shared/ui/deprecated/TextParagraf"
import { Button } from "@/shared/ui/redesigned/Button"
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
  const onOpenModalAuth = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  if (authData) {
    return (
      <ToggleFeaturesComponent
        feature={"isAppRedesigned"}
        on={
          <header className={cn("navbar", [className])}>
            <HStack gap="16" className="navbar__actions">
              <ButtonNotification />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={cn("navbar-deprecated", [className])}>
            <TextParagraf className="" title={t("SDN")} textVar={TextVar.PRIMARY} />

            <AppLink
              to={routePatch.articleCreate()}
              appLinkColor={"secondary"}
              className="navbar-deprecated__create-btn"
            >
              {t("Создать статью")}
            </AppLink>
            <HStack gap="16" className="navbar-deprecated__actions">
              <ButtonNotification className="navbar-deprecated__notification" />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    )
  }

  const mainClass = toggleFeatures({
    name: "isAppRedesigned",
    on: () => "navbar",
    off: () => "navbar-deprecated",
  })

  return (
    <header className={cn(mainClass, [className])}>
      <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={
          <Button className="navbar__login" variant={"clear"} onClick={onOpenModalAuth}>
            {t("login")}
          </Button>
        }
        off={
          <ButtonDeprecated
            className="navbar-deprecated__login"
            buttonVar={ButtonVar.CLEAR}
            onClick={onOpenModalAuth}
          >
            {t("login")}
          </ButtonDeprecated>
        }
      />

      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModalAuth} />}
    </header>
  )
})
