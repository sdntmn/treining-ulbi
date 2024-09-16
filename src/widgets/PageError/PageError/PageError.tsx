import { useTranslation } from "react-i18next"
import { Button } from "shared/Button/Button"
import { cn } from "shared/lib/helpers/classNames/classNames"

import "./PageError.module.scss"

interface PageErrorProps {
  className?: string
}

export const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation("translation")
  const reloadPage = () => {
    location.reload()
  }
  return (
    <div className={cn("page-error", {}, [className])}>
      <p>{t("errorPage")}</p>
      <Button onClick={reloadPage}>{t("refreshPage")}</Button>
    </div>
  )
}
