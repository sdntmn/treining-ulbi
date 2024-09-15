import { createContext } from "react"

export enum Theme {
  default = "app-default-theme",
  dark = "app-dark-theme",
}

export interface ThemeContext {
  theme?: Theme
  setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContext>({})

export const LOCAL_STORAGE_THEME_KEY = "theme"
