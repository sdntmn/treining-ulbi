import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "app/providers/ThemeProvider/lib/theme/ThemeContext";
import { useContext } from "react";

interface UseThemeHook {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeHook {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    const newTheme = theme === Theme.default ? Theme.dark : Theme.default;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };
  return {
    theme,
    toggleTheme,
  };
}
