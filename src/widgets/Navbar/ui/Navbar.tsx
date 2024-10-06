import React, { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { cn } from "shared/lib/classNames/classNames"
import { Button, ButtonVar } from "shared/ui/Button/Button"
import { Modal } from "shared/ui/Modal/Modal"

import "./Navbar.module.scss"

interface NavbarProps {
  className?: string
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation("translation")
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false)

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev: boolean) => !prev)
  }, [])

  return (
    <div className={cn("navbar", {}, [className])}>
      <Button
        className="navbar__login"
        buttonVar={ButtonVar.CLEAR}
        onClick={onToggleModal}
      >
        {t("login")}
      </Button>
      <Modal isOpen={isAuthModal} onClose={onToggleModal}></Modal>
    </div>
  )
}
