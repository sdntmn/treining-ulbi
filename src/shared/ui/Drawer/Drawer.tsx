import React, { memo, ReactNode } from "react"
import { cn } from "shared/lib/classNames/classNames"

import { useModal } from "../../lib/hooks/useModal/useModal"
import { useTheme } from "../../lib/hooks/useTheme/useTheme"
import { Overlay } from "../Overlay/Overlay"
import { Portal } from "../Portal/Portal"

import "./Drawer.module.scss"

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

export const Drawer: React.FC<DrawerProps> = memo((props: DrawerProps) => {
  const { className, children, onClose, isOpen, lazy } = props
  const { theme } = useTheme()

  const { close, isClosing, isMounted } = useModal({
    animationDelay: 300,
    onClose,
    isOpen,
  })

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div
        className={cn("drawer", [
          className,
          theme,
          "app_drawer",
          isOpen && "drawer_opened",
          isClosing && "drawer_closing",
        ])}
      >
        <Overlay onClick={close} />
        <div className="drawer__content">{children}</div>
      </div>
    </Portal>
  )
})

Drawer.displayName = "Drawer"
