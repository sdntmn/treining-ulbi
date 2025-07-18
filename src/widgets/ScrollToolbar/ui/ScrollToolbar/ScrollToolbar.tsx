import { memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { VStack } from "@/shared/ui/redesigned/Stack"

import { ScrollToTopButton } from "@/features/scrollToTopButton"

import "./ScrollToolbar.module.scss"

interface ScrollToolbarProps {
  className?: string
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props

  return (
    <VStack justify="center" align="center" max className={cn("scroll-toolbar", [className])}>
      <ScrollToTopButton />
    </VStack>
  )
})

ScrollToolbar.displayName = "ScrollToolbar"
