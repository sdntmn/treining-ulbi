import { memo } from "react"

import CircleIcon from "@/shared/assets/icons/circle-up.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import { Icon } from "@/shared/ui/redesigned/Icon"

interface ScrollToTopButtonProps {
  className?: string
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
  const { className } = props

  const onCLick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Icon
      Svg={CircleIcon}
      clickable
      onClick={onCLick}
      width={32}
      height={32}
      className={cn("scroll-top-button", [className])}
    />
  )
})

ScrollToTopButton.displayName = "ScrollToTopButton"
