import { getUserInitialized, userActions } from "entities/User"
import React, { Suspense, useEffect } from "react"
import { useSelector } from "react-redux"
import { cn } from "shared/lib/classNames/classNames"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useTheme } from "shared/lib/hooks/useTheme/useTheme"
import { Navbar } from "widgets/Navbar"
import { Sidebar } from "widgets/SideBar"

import { AppRouter } from "./providers/router"

import "app/styles/index.scss"

const App: React.FC = () => {
  const { theme } = useTheme()

  const initializedUser = useSelector(getUserInitialized)

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
          {initializedUser && <AppRouter />}
        </div>
      </Suspense>
    </div>
  )
}

export default App
