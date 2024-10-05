import React, { memo, useState } from "react"
import { useTranslation } from "react-i18next"
import AboutIcon from "shared/assets/icons/about-page.svg"
import MainIcon from "shared/assets/icons/main-page.svg"
import { RouterPath } from "shared/config/routerConfig/routerConfig"
import { cn } from "shared/lib/classNames/classNames"
import { AppLink, AppLinkColor } from "shared/ui/AppLink/AppLink"
import { Button, ButtonFontSize, ButtonVar } from "shared/ui/Button/Button"
import { LangSwitcher } from "widgets/LangSwitcher/LangSwitcher"
import { ThemeSwitcher } from "widgets/ThemeSwitcher"

import "./Sidebar.module.scss"

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = memo(function Sidebar({
  className,
}: SidebarProps) {
  const { t } = useTranslation("translation")
  const [collapsed, setCollapsed] = useState(false)

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <div
      data-testid="sidebar"
      className={cn("sidebar", {}, [
        collapsed && "sidebar__collapsed",
        className,
      ])}
    >
      <div className="sidebar__items">
        <AppLink
          appLinkColor={AppLinkColor.Secondary}
          className="sidebar__item"
          to={RouterPath.main}
        >
          <MainIcon className="sidebar__icon" />
          <span className={cn("sidebar__link")}>{t("navLinkMain")}</span>
        </AppLink>

        <AppLink
          className="sidebar__item"
          appLinkColor={AppLinkColor.Secondary}
          to={RouterPath.about}
        >
          <AboutIcon className="sidebar__icon" />
          <span className={cn("sidebar__link")}>{t("navLinkAbout")}</span>
        </AppLink>
      </div>

      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className="sidebar__collapsed-btn"
        buttonVar={ButtonVar.OUTLINE}
        fontSize={ButtonFontSize.FONT_L}
      >
        {collapsed ? ">" : "<"}
      </Button>

      <div className="sidebar__switchers">
        <ThemeSwitcher />
        <LangSwitcher schort={collapsed} />
      </div>
    </div>
  )
})
