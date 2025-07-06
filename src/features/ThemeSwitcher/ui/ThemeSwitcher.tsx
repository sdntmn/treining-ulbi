import React, { memo, useCallback } from "react"

import ThemeIconDeprecated from "@/shared/assets/icons/theme-light.svg"
import ThemeIcon from "@/shared/assets/icons/theme.svg"
import { Theme } from "@/shared/const/enums"
import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme"
import { Button, ButtonVar } from "@/shared/ui/deprecated/Button"
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon"
import { Icon } from "@/shared/ui/redesigned/Icon"

import { saveJsonSettings } from "@/entities/User"

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = memo(function ThemeSwitcher({
  className,
}: ThemeSwitcherProps) {
  const dispatch = useAppDispatch()
  const { toggleTheme } = useTheme()

  const onToggleTheme = useCallback(() => {
    toggleTheme((newTheme: Theme) => {
      dispatch(saveJsonSettings({ theme: newTheme }))
    })
  }, [dispatch, toggleTheme])
  return (
    <ToggleFeaturesComponent
      feature={"isAppRedesigned"}
      on={<Icon Svg={ThemeIcon} width={40} height={40} clickable onClick={onToggleTheme} />}
      off={
        <Button
          buttonVar={ButtonVar.CLEAR}
          className={cn("theme-switcher", [className])}
          onClick={onToggleTheme}
        >
          <IconDeprecated Svg={ThemeIconDeprecated} width={40} height={40} inverted />
        </Button>
      }
    />
  )
})
