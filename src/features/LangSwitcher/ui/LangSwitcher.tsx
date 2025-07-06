import React, { memo } from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { Button as ButtonDeprecated, ButtonSquare, ButtonVar } from "@/shared/ui/deprecated/Button"
import { Button } from "@/shared/ui/redesigned/Button"

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export const LangSwitcher: React.FC<LangSwitcherProps> = memo(function LangSwitcher({
  className,
  short,
}: LangSwitcherProps) {
  const { t, i18n } = useTranslation("sideBar")

  const changeLanguage = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")
  }

  return (
    <ToggleFeaturesComponent
      feature={"isAppRedesigned"}
      on={
        <Button variant="clear" onClick={changeLanguage}>
          {t(short ? "languageShort" : "language")}
        </Button>
      }
      off={
        <ButtonDeprecated
          className={cn("", [className])}
          buttonVar={ButtonVar.CLEAR}
          square={ButtonSquare.SQUARE_M}
          onClick={changeLanguage}
        >
          {t(short ? "languageShort" : "language")}
        </ButtonDeprecated>
      }
    />
  )
})
