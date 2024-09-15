import { useTranslation } from "react-i18next"
import { cn } from "shared/lib/helpers/classNames/classNames"

import "./NotFoundPage.module.scss"

interface NotFoundPageProps {
  className?: string
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const { t } = useTranslation("notPage")

  return (
    <div className={cn("not-found-page", {}, [className])}>
      {t("notFoundPage")}
    </div>
  )
}
