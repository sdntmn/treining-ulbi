import React, { useEffect, useMemo, useState } from "react"

import { Theme } from "@/shared/const/enums"
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localstorage"
import { ThemeContext } from "@/shared/lib/context/ThemeContext"

import { useJsonSettings } from "@/entities/User"

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme

interface ThemeProviderProps {
  initialTheme?: Theme
  children?: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const { theme: defaultTheme } = useJsonSettings()
  const [theme, setTheme] = useState<Theme>(initialTheme || fallbackTheme || Theme.default)
  const [isThemeInited, setThemeInited] = useState(false)

  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme])

  useEffect(() => {
    if (!isThemeInited && defaultTheme) {
      setTheme(defaultTheme)
      setThemeInited(true)
    }
  }, [defaultTheme, isThemeInited])

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>
}
