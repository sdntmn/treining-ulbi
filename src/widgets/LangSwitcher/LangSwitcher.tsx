import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { cn } from "shared/lib/classNames/classNames"
import { Button, ButtonSquare, ButtonVar } from "shared/ui/Button/Button"

interface LangSwitcherProps {
  className?: string
  schort?: boolean
}

export const LangSwitcher: React.FC<LangSwitcherProps> = memo(
  function LangSwitcher({ className, schort }: LangSwitcherProps) {
    const { t, i18n } = useTranslation("translation")

    const changeLanguage = async () => {
      i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")
    }

    return (
      <Button
        className={cn("", [className])}
        buttonVar={ButtonVar.CLEAR}
        square={ButtonSquare.SQUARE_M}
        onClick={changeLanguage}
      >
        {t(schort ? "languageShort" : "language")}
      </Button>
    )
  }
)
