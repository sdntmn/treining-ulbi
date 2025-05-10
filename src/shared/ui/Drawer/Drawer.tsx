import React, { memo, ReactNode } from "react"
import { cn } from "shared/lib/classNames/classNames"

import { useTheme } from "../../lib/hooks/useTheme/useTheme"
import { Overlay } from "../Overlay/Overlay"
import { Portal } from "../Portal/Portal"

import "./Drawer.module.scss"

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

export const Drawer: React.FC<DrawerProps> = memo((props: DrawerProps) => {
  const { className, children, onClose, isOpen } = props
  const { theme } = useTheme()

  return (
    <Portal>
      <div
        className={cn("drawer", [
          className,
          theme,
          "app_drawer",
          isOpen && "drawer_opened",
        ])}
      >
        <Overlay onClick={onClose} />
        <div className="drawer__content">{children}</div>
      </div>
    </Portal>
  )
})

Drawer.displayName = "Drawer"
