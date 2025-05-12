import React, { memo, useMemo, useState } from "react"
import { useSelector } from "react-redux"

import { cn } from "@/shared/lib/classNames/classNames"
import { Button, ButtonFontSize, ButtonVar } from "@/shared/ui/Button/Button"
import { VStack } from "@/shared/ui/Stack"
import { LangSwitcher } from "@/widgets/LangSwitcher"
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher"

import { getSidebarItems } from "../../model/selectors/getSidebarItems"
import { SidebarItem } from "../SidebarItem/SidebarItem"

import "./Sidebar.module.scss"

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = memo(function Sidebar({
  className,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const sidebarItemsList = useSelector(getSidebarItems)

  const onToggle = () => {
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
    <aside
      data-testid="sidebar"
      className={cn("sidebar", [
        className,
        collapsed ? "sidebar__collapsed" : "",
      ])}
    >
      <VStack role="navigation" gap="16" className="sidebar__items">
        {itemsList}
      </VStack>

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
    </aside>
  )
})
