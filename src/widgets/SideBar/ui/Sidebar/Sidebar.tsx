import React, { memo, useState } from "react"
import { cn } from "shared/lib/classNames/classNames"
import { Button, ButtonFontSize, ButtonVar } from "shared/ui/Button/Button"
import { LangSwitcher } from "widgets/LangSwitcher/LangSwitcher"
import { ThemeSwitcher } from "widgets/ThemeSwitcher"

import { SidebarItemsList } from "../../model/items"
import { SidebarItem } from "../SidebarItem/SidebarItem"

import "./Sidebar.module.scss"

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = memo(function Sidebar({
  className,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <div
      data-testid="sidebar"
      className={cn("sidebar", [
        className,
        collapsed ? "sidebar__collapsed" : "",
      ])}
    >
      <div className="sidebar__items">
        {SidebarItemsList.map((item) => (
          <SidebarItem item={item} collapsed={collapsed} key={item.path} />
        ))}
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
