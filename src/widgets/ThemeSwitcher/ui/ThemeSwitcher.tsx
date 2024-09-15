import { Theme } from "app/providers/ThemeProvider/lib/theme/ThemeContext"
import DarkIcon from "shared/assets/icons/theme-dark.svg"
import LightIcon from "shared/assets/icons/theme-light.svg"
import { Button, ButtonVar } from "shared/Button/Button"
import { cn } from "shared/lib/helpers/classNames/classNames"
import { useTheme } from "shared/lib/hooks/useTheme/useTheme"
// Import "./ThemeSwitcher.module.scss";
interface ThemeSwitcherProps {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button
      buttonVar={ButtonVar.CLEAR}
      className={cn("theme-switcher", {}, [className])}
      onClick={toggleTheme}
    >
      {theme === Theme.default ? <LightIcon /> : <DarkIcon />}
      привет
    </Button>
  )
}
