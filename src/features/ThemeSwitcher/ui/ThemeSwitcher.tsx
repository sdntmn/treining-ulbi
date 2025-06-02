import React, { memo } from "react"

import DarkIcon from "@/shared/assets/icons/theme-dark.svg"
import LightIcon from "@/shared/assets/icons/theme-light.svg"
import { Theme } from "@/shared/const/enums"
import { cn } from "@/shared/lib/classNames/classNames"
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme"
import { Button, ButtonVar } from "@/shared/ui/Button"

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = memo(function ThemeSwitcher({
  className,
}: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button
      buttonVar={ButtonVar.CLEAR}
      className={cn("theme-switcher", [className])}
      onClick={toggleTheme}
    >
      {theme === Theme.default ? <LightIcon /> : <DarkIcon />}
    </Button>
  )
})
