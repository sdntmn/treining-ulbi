import React, { memo, useCallback } from "react"

import DarkIcon from "@/shared/assets/icons/theme-dark.svg"
import LightIcon from "@/shared/assets/icons/theme-light.svg"
import { Theme } from "@/shared/const/enums"
import { cn } from "@/shared/lib/classNames/classNames"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme"
import { Button, ButtonVar } from "@/shared/ui/Button"

import { saveJsonSettings } from "@/entities/User"

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = memo(function ThemeSwitcher({
  className,
}: ThemeSwitcherProps) {
  const dispatch = useAppDispatch()
  const { theme, toggleTheme } = useTheme()

  const onToggleTheme = useCallback(() => {
    toggleTheme((newTheme: Theme) => {
      console.log("Тема переключена" + newTheme)
      dispatch(saveJsonSettings({ theme: newTheme }))
    })
  }, [dispatch, toggleTheme])
  return (
    <Button
      buttonVar={ButtonVar.CLEAR}
      className={cn("theme-switcher", [className])}
      onClick={onToggleTheme}
    >
      {theme === Theme.default ? <LightIcon /> : <DarkIcon />}
    </Button>
  )
})
