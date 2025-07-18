import { useContext } from "react"

import { Theme } from "@/shared/const/enums"

import { ThemeContext } from "../../context/ThemeContext"

interface UseThemeHook {
  toggleTheme: (saveActions?: (theme: Theme) => void) => void
  theme: Theme
}

export function useTheme(): UseThemeHook {
  const { theme, setTheme } = useContext(ThemeContext)
  const toggleTheme = (saveActions?: (theme: Theme) => void) => {
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

    saveActions?.(newTheme)
    // localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }
  return {
    theme: theme || Theme.default,
    toggleTheme,
  }
}
