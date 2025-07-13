/* eslint-disable react/display-name */
import React, { memo, Suspense, useEffect } from "react"
import { useSelector } from "react-redux"

import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localstorage"
import { AppLoaderLayout } from "@/shared/layouts/AppLoaderLayout"
import { MainLayout } from "@/shared/layouts/MainLayout"
import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme"

import { getUserInitialized, initAuthData } from "@/entities/User"

import { Navbar } from "@/widgets/Navbar"
import { PageLoader } from "@/widgets/PageLoader"
import { Sidebar } from "@/widgets/SideBar"

import { useAppToolbar } from "./lib/useAppToolbar"
import { AppRouter } from "./providers/router"
import { withTheme } from "./providers/ThemeProvider/ui/withTheme"
import "./styles/index.scss"

const App: React.FC = memo(function App() {
  const { theme } = useTheme()

  const initializedUser = useSelector(getUserInitialized)
  const toolbar = useAppToolbar()

  const dispatch = useAppDispatch()

  useEffect(() => {
    document.body.className = theme
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    dispatch(initAuthData())
  }, [dispatch])

  if (!initializedUser) {
    return (
      <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={
          <div id="app" className={cn("app-redesigned", [theme])}>
            <AppLoaderLayout />
          </div>
        }
        off={
          <div id="app" className={cn("app", [theme])}>
            <PageLoader />
          </div>
        }
      />
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
              toolbar={toolbar}
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
})

export default withTheme(App)
