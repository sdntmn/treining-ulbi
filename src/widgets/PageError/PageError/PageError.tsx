/* eslint-disable react/prop-types */
import React from "react"
import { useTranslation } from "react-i18next"
import { cn } from "shared/lib/classNames/classNames"
import { Button } from "shared/ui/Button/Button"

import "./PageError.module.scss"

interface PageErrorProps {
  className?: string
}

export const PageError: React.FC<PageErrorProps> = ({ className }) => {
  const { t } = useTranslation("common")
  const reloadPage = () => {
    location.reload()
  }
  return (
    <div className={cn("page-error", [className])}>
      <p>{t("errorPage")}</p>
      <Button onClick={reloadPage}>{t("refreshPage")}</Button>
    </div>
  )
}
