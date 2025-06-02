import React, { useMemo, useState } from "react"

import { Theme } from "@/shared/const/enums"
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localstorage"
import { ThemeContext } from "@/shared/lib/context/ThemeContext"

const defaultTheme: Theme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.default

interface ThemeProviderProps {
  initialTheme?: Theme
  children?: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)

  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>
}
