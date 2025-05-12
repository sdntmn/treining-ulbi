import { createContext } from "react"

import { Theme } from "@/shared/const/enums"

export interface ThemeContext {
  theme?: Theme
  setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContext>({})
