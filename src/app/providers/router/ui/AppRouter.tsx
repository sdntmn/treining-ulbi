import React, { memo, useCallback, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import { routeConfig } from "@/shared/config/routerConfig/routerConfig"
import { AppRoutesProps } from "@/shared/types/routerType"
import { PageLoader } from "@/widgets/PageLoader"

import { RequireAuth } from "./RequireAuth"

const AppRouter: React.FC = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    )
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    )
  }, [])
  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
}

export default memo(AppRouter)
