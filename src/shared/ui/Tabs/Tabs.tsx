import React, { memo, ReactNode, useCallback } from "react"
import { cn } from "shared/lib/classNames/classNames"
import { Card, CardTheme } from "shared/ui/Card/Card"

import "./Tabs.module.scss"

export interface TabItem {
  value: string
  content: ReactNode
}

interface TabsProps {
  className?: string
  tabs: TabItem[]
  value: string
  onTabClick: (tab: TabItem) => void
}

export const Tabs: React.FC<TabsProps> = memo(function Tabs(props: TabsProps) {
  const { className, tabs, onTabClick, value } = props

  const clickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab)
    },
    [onTabClick]
  )

  return (
    <div className={cn("tabs", [className])}>
      {tabs.map((tab) => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          className={"tab"}
          key={tab.value}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  )
})
