import { userActions } from "entities/User"
import React, { Suspense, useEffect } from "react"
import { cn } from "shared/lib/classNames/classNames"
import { useTheme } from "shared/lib/hooks/useTheme/useTheme"
import { Navbar } from "widgets/Navbar"
import { Sidebar } from "widgets/SideBar"

import { АррRouter } from "./providers/router"
import { useAppDispatch } from "./providers/StoreProvider/configStore/store"

const App: React.FC = () => {
  const { theme } = useTheme()

  const dispatch = useAppDispatch()

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={cn("app", [theme])}>
      <Suspense fallback={""}>
        <Navbar />
        <div className="app__page">
          <Sidebar />
          <АррRouter />
        </div>
      </Suspense>
    </div>
  )
}

export default App
