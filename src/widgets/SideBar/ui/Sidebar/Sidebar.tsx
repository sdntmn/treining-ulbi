import React, { memo, useState } from "react"
import { cn } from "shared/lib/classNames/classNames"
import { Button, ButtonVar } from "shared/ui/Button/Button"
import { LangSwitcher } from "widgets/LangSwitcher/LangSwitcher"
import { ThemeSwitcher } from "widgets/ThemeSwitcher"

import "./Sidebar.module.scss"

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = memo(function Sidebar({
  className,
}: SidebarProps) {
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
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className="sidebar__collapsed-btn"
        buttonVar={ButtonVar.OUTLINE}
      >
        {collapsed ? ">" : "<"}
      </Button>

      <div className="sidebar__switchers">
        <ThemeSwitcher />
        <LangSwitcher className="sidebar__lang-switcher" />
      </div>
    </div>
  )
})
