import React from "react"
import { cn } from "shared/lib/classNames/classNames"

import { useModal } from "../../lib/hooks/useModal/useModal"
import { Portal } from "../Portal/Portal"

import "./Modal.module.scss"

interface ModalProps {
  className?: string
  children?: React.ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  className,
  children,
  onClose,
  isOpen,
  lazy,
}) => {
  const ANIMATION_DELAY = 300
  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  })

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div
        className={cn("modal", [
          className,
          isOpen ? "modal__open" : "",
          isClosing ? "modal__closing" : "",
        ])}
      >
        <div className="modal__overlay" onClick={close}>
          <div className="modal__content" onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
