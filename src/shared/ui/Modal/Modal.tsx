import React, { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "shared/lib/classNames/classNames"

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
  const [isClosing, setIsClosing] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const ANIMATION_DELAY = 300

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, ANIMATION_DELAY)
    }
  }, [onClose])

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const onEscPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHandler()
      }
    },
    [closeHandler]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onEscPress)
    }
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
      }
      window.removeEventListener("keydown", onEscPress)
    }
  }, [isOpen, onEscPress])

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }
  }, [isOpen])

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
        <div className="modal__overlay" onClick={closeHandler}>
          <div className="modal__content" onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
