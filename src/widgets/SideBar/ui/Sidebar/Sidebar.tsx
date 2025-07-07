import React, { memo, useMemo, useState } from "react"
import { useSelector } from "react-redux"

import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { Button, ButtonFontSize, ButtonVar } from "@/shared/ui/deprecated/Button"
import { AppLogo } from "@/shared/ui/redesigned/AppLogo"
import { Icon } from "@/shared/ui/redesigned/Icon"
import { VStack } from "@/shared/ui/redesigned/Stack"

import { LangSwitcher } from "@/features/LangSwitcher"
import { ThemeSwitcher } from "@/features/ThemeSwitcher"

import { getSidebarItems } from "../../model/selectors/getSidebarItems"
import { SidebarItem } from "../SidebarItem/SidebarItem"

import "./Sidebar.module.scss"

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = memo(function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const sidebarItemsList = useSelector(getSidebarItems)

  const onToggle = () => {
    console.log(collapsed)
    setCollapsed((prev) => !prev)
  }

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsed} key={item.path} />
      )),
    [collapsed, sidebarItemsList]
  )

  return (
    <ToggleFeaturesComponent
      feature={"isAppRedesigned"}
      on={
        <aside
          data-testid="sidebar"
          className={cn("sidebar-redesigned", [
            className,
            collapsed && "sidebar-redesigned__collapsed",
          ])}
        >
          <AppLogo size={collapsed ? 30 : 50} className="sidebar-redesigned__logo" />
          <VStack role="navigation" gap="16" className="sidebar-redesigned__items">
            {itemsList}
          </VStack>
          <Icon
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className="sidebar-redesigned__collapsed-btn "
            Svg={ArrowIcon}
            clickable
          />
          <div className="sidebar-redesigned__switchers">
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} />
          </div>
        </aside>
      }
      off={
        <aside
          data-testid="sidebar"
          className={cn("sidebar", [className, collapsed ? "sidebar__collapsed" : ""])}
        >
          <VStack role="navigation" gap="16" className="sidebar__items">
            {itemsList}
          </VStack>

          <Button
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className="sidebar__collapsed-btn "
            buttonVar={ButtonVar.OUTLINE}
            fontSize={ButtonFontSize.FONT_L}
          >
            {collapsed ? ">" : "<"}
          </Button>

          <div className="sidebar__switchers">
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} />
          </div>
        </aside>
      }
    />
  )
})
