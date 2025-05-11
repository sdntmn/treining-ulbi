import { useContext } from "react"

import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from "@/app/providers/ThemeProvider/lib/theme/ThemeContext"

interface UseThemeHook {
  toggleTheme: () => void
  theme: Theme
}

export function useTheme(): UseThemeHook {
  const { theme, setTheme } = useContext(ThemeContext)
  const toggleTheme = () => {
    let newTheme: Theme = Theme.default

    switch (theme) {
      case Theme.default:
        newTheme = Theme.dark
        break

      case Theme.dark:
        newTheme = Theme.custom
        break

      case Theme.custom:
        newTheme = Theme.default
        break
      default:
        newTheme = Theme.default
    }
    setTheme?.(newTheme)
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }
  return {
    theme: theme || Theme.default,
    toggleTheme,
  }
}
