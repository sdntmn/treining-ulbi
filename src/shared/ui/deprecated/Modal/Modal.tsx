import React from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { useModal } from "@/shared/lib/hooks/useModal/useModal"

import { Overlay } from "../../redesigned/Overlay"
import { Portal } from "../../redesigned/Portal"
import "./Modal.module.scss"

interface ModalProps {
  className?: string
  children?: React.ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Modal: React.FC<ModalProps> = ({ className, children, onClose, isOpen, lazy }) => {
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
        className={cn("modal", [className, isOpen && "modal__open", isClosing && "modal__closing"])}
      >
        <Overlay onClick={close} />
        <div className="modal__content" onClick={onContentClick}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
