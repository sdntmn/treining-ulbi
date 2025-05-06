import React, { memo, useCallback } from "react"
import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import {
  AppRoutesProps,
  routeConfig,
} from "shared/config/routerConfig/routerConfig"
import { PageLoader } from "widgets/PageLoader/PageLoader"

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
