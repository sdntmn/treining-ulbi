import React, { Suspense } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { Loader } from "@/shared/ui/Loader/Loader"
import { Modal } from "@/shared/ui/Modal/Modal"

import { LoginFormAsync } from "../LoginForm/LoginForm.async"

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal: React.FC<LoginModalProps> = (
  props: LoginModalProps
) => {
  const { className, isOpen, onClose } = props

  return (
    <Modal
      className={cn("login-modal", [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  )
}
