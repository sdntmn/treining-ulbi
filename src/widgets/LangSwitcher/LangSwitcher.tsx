import { useTranslation } from "react-i18next"
import { cn } from "shared/lib/classNames/classNames"
import { Button, ButtonVar } from "shared/ui/Button/Button"

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation("translation")

  const changeLanguage = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")
  }

  return (
    <Button
      className={cn("", {}, [className])}
      buttonVar={ButtonVar.CLEAR}
      onClick={changeLanguage}
    >
      {t("language")}
    </Button>
  )
}
