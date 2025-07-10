import React from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { useModal } from "@/shared/lib/hooks/useModal/useModal"

import { toggleFeatures } from "../../../lib/features"
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

  const modalClasses = toggleFeatures<string>({
    name: "isAppRedesigned",
    on: () => "modal",
    off: () => "modal-deprecated",
  })
  const modalContent = toggleFeatures({
    name: "isAppRedesigned",
    on: () => "modal__content",
    off: () => "modal-deprecated__content",
  })

  return (
    <Portal element={document.getElementById("app") ?? document.body}>
      <div
        className={cn(modalClasses, [
          className,
          isOpen && `${modalClasses}__open`,
          isClosing && `${modalClasses}__closing`,
        ])}
      >
        <Overlay onClick={close} />
        <div className={modalContent} onClick={onContentClick}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
