import { getUserAuthData, User, userActions } from "entities/User"
import { LoginModal } from "features/AuthByUserName"
import React, { memo, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { cn } from "shared/lib/classNames/classNames"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Button, ButtonVar } from "shared/ui/Button/Button"

import "./Navbar.module.scss"

interface NavbarProps {
  className?: string
}

export const Navbar: React.FC<NavbarProps> = memo(function Navbar({
  className,
}: NavbarProps) {
  const dispath = useAppDispatch()
  const { t } = useTranslation("translation")
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false)

  const authData: User | undefined = useSelector(getUserAuthData)

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
      <header className={cn("navbar", [className])}>
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
      </header>
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
        <LoginModal isOpen={isAuthModal} onClose={onCloseModalAuth} />
      )}
    </div>
  )
})
