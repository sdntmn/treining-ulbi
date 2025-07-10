import React, { Suspense, useEffect } from "react"
import { useSelector } from "react-redux"

import { MainLayout } from "@/shared/layouts/MainLayout"
import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme"

import { getUserInitialized, initAuthData } from "@/entities/User"

import { Navbar } from "@/widgets/Navbar"
import { PageLoader } from "@/widgets/PageLoader"
import { Sidebar } from "@/widgets/SideBar"

import { AppRouter } from "./providers/router"

import "./styles/index.scss"

const App: React.FC = () => {
  const { theme } = useTheme()

  const initializedUser = useSelector(getUserInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  useEffect(() => {
    dispatch(initAuthData())
  }, [dispatch])

  if (!initializedUser) {
    return (
      <div className="app__loading">
        <PageLoader />
      </div>
    )
  }

  return (
    <ToggleFeaturesComponent
      feature={"isAppRedesigned"}
      on={
        <div id="app" className={cn("app-redesigned", [theme])}>
          <Suspense fallback={""}>
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
              toolbar={<div>55 </div>}
            />
          </Suspense>
        </div>
      }
      off={
        <div id="app" className={cn("app", [theme])}>
          <Suspense fallback={""}>
            <Navbar />
            <div className="app__page">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
    />
  )
}

export default App
