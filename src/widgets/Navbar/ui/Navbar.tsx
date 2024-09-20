import React from "react"
import { useTranslation } from "react-i18next"
import { cn } from "shared/lib/classNames/classNames"
import { AppLink, AppLinkColor } from "shared/ui/AppLink/AppLink"

import "./Navbar.module.scss"

interface NavbarProps {
  className?: string
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation("translation")
  return (
    <div className={cn("navbar", {}, [className])}>
      <div className={cn("navbar__links")}>
        <AppLink
          appLinkColor={AppLinkColor.Secondary}
          className={cn("navbar__link")}
          to="/"
        >
          {t("navLinkMain")}
        </AppLink>
        <AppLink appLinkColor={AppLinkColor.Secondary} to="/about">
          {t("navLinkAbout")}
        </AppLink>
      </div>
    </div>
  )
}
