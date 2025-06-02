/* eslint-disable react/prop-types */
import React from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/shared/lib/classNames/classNames"

import "./NotFoundPage.module.scss"

interface NotFoundPageProps {
  className?: string
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ className }) => {
  const { t } = useTranslation("notPage")

  return (
    <div data-testid="NotFoundPage" className={cn("not-found-page", [className])}>
      {t("notFoundPage")}
    </div>
  )
}
