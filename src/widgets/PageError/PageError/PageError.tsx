import { useTranslation } from "react-i18next"
import { cn } from "shared/lib/classNames/classNames"
import { Button } from "shared/ui/Button/Button"

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
