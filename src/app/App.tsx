import React, { Suspense, useEffect } from "react"
import { cn } from "shared/lib/classNames/classNames"
import { useTheme } from "shared/lib/hooks/useTheme/useTheme"
import { Navbar } from "widgets/Navbar"
import { Sidebar } from "widgets/SideBar"

import { АррRouter } from "./providers/router"

const App: React.FC = () => {
  const { theme } = useTheme()

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className={cn("app", {}, [theme])}>
      <Suspense fallback={""}>
        <Navbar />
        <div className={cn("app__page")}>
          <Sidebar />
          <АррRouter />
        </div>
      </Suspense>
    </div>
  )
}

export default App
