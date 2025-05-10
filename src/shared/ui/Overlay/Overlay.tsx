import React, { memo } from "react"
import { cn } from "shared/lib/classNames/classNames"

import "./Overlay.module.scss"

interface OverlayProps {
  className?: string
  onClick?: () => void
}

export const Overlay: React.FC<OverlayProps> = memo((props: OverlayProps) => {
  const { className, onClick } = props

  return <div onClick={onClick} className={cn("overlay", [className])} />
})

Overlay.displayName = "Overlay"
