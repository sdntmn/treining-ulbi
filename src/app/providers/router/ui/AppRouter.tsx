import { getUserAuthData } from "entities/User"
import React, { useMemo } from "react"
import { Suspense } from "react"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { routerConfig } from "shared/config/routerConfig/routerConfig"
import { PageLoader } from "widgets/PageLoader/PageLoader"

export const АррRouter: React.FC = () => {
  const isAuth = useSelector(getUserAuthData)
  const routes = useMemo(
    () =>
      Object.values(routerConfig).filter((route) => {
        if (!isAuth && route.authOnly) {
          return false
        } else return true
      }),
    [isAuth]
  )
  return (
    <Routes>
      {routes.map(({ element, path }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<PageLoader />}>
              <div className="app__content">{element}</div>
            </Suspense>
          }
        />
      ))}
    </Routes>
  )
}
