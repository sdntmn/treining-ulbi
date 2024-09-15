import React from "react"
import { useTranslation } from "react-i18next"
import { cn } from "shared/lib/helpers/classNames/classNames"
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
          to={"/"}
          className={cn("navbar__link")}
          appLinkColor={AppLinkColor.Secondary}
        >
          {t("navLinkMain")}
        </AppLink>
        <AppLink to={"/about"} appLinkColor={AppLinkColor.Secondary}>
          {t("navLinkAbout")}
        </AppLink>
      </div>
    </div>
  )
}
