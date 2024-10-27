import { getUserAuthData, User, userActions } from "entities/User"
import { LoginModal } from "features/AuthByUserName"
import React, { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { cn } from "shared/lib/classNames/classNames"
// import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Button, ButtonVar } from "shared/ui/Button/Button"

import "./Navbar.module.scss"

interface NavbarProps {
  className?: string
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const dispath = useDispatch()
  const { t } = useTranslation("translation")
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false)

  const authData: User = useSelector(getUserAuthData)

  const onCloseModalAuth = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onOpenModalAuth = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  const onLogout = useCallback(() => {
    dispath(userActions.logOut())
  }, [dispath])

  if (authData) {
    return (
      <div className={cn("navbar", [className])}>
        <Button
          className="navbar__login"
          buttonVar={ButtonVar.CLEAR}
          onClick={onLogout}
        >
          {t("goOut")}
        </Button>
        <LoginModal
          isOpen={isAuthModal}
          onClose={onCloseModalAuth}
        ></LoginModal>
      </div>
    )
  }

  return (
    <div className={cn("navbar", [className])}>
      <Button
        className="navbar__login"
        buttonVar={ButtonVar.CLEAR}
        onClick={onOpenModalAuth}
      >
        {t("login")}
      </Button>
      {isAuthModal && (
        <LoginModal
          isOpen={isAuthModal}
          onClose={onCloseModalAuth}
        ></LoginModal>
      )}
    </div>
  )
}
