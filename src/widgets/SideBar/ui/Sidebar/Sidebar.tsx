import { memo, useState } from "react"
import { cn } from "shared/lib/classNames/classNames"
import { Button, ButtonVar } from "shared/ui/Button/Button"
import { LangSwitcher } from "widgets/LangSwitcher/LangSwitcher"
import { ThemeSwitcher } from "widgets/ThemeSwitcher"

import cls from "./Sidebar.module.scss"

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <div
      data-testid="sidebar"
      className={cn("sidebar", { [cls.collapsed]: collapsed }, [className])}
    >
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className="sidebar__collapsed-btn"
        buttonVar={ButtonVar.CLEAR}
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
