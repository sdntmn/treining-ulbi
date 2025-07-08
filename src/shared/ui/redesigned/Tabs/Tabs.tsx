import React, { memo, ReactNode, useCallback } from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import { Card } from "../Card"
import { Flex, FlexDirection } from "../Stack/Flex/Flex"
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
  direction?: FlexDirection
}

export const Tabs: React.FC<TabsProps> = memo(function Tabs(props: TabsProps) {
  const { className, tabs, onTabClick, value, direction = "row" } = props

  const clickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab)
    },
    [onTabClick]
  )

  return (
    <Flex className={cn("tabs", [className])} direction={direction} gap="8" align="start">
      {tabs.map((tab) => {
        const isSelected = tab.value === value
        return (
          <Card
            className={cn("tab", [isSelected && "tab__selected"])}
            key={tab.value}
            onClick={clickHandle(tab)}
            variant={isSelected ? "light" : "normal"}
            border="round"
          >
            {tab.content}
          </Card>
        )
      })}
    </Flex>
  )
})
