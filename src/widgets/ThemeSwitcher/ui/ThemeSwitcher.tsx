import { cn } from "shared/lib/helpers/classNames/classNames";

import { useTheme } from "shared/lib/hooks/useTheme/useTheme";
import LightIcon from "shared/assets/icons/theme-light.svg";
import DarkIcon from "shared/assets/icons/theme-dark.svg";
import { Theme } from "app/providers/ThemeProvider/lib/theme/ThemeContext";
import { Button, ButtonVar } from "shared/Button/Button";
// import "./ThemeSwitcher.module.scss";
interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button className={cn("theme-switcher", {}, [className])} onClick={toggleTheme} buttonVar={ButtonVar.CLEAR}>
      {theme === Theme.default ? <LightIcon /> : <DarkIcon />}
    </Button>
  );
};
