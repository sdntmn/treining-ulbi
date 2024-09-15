import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { routerConfig } from "shared/config/routerConfig/routerConfig"

export const АррRouter = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        {Object.values(routerConfig).map(
          ({ element, path }) => (
            console.info(path),
            console.info(element),
            (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <div className="page-wrapper">{element}</div>
                  </Suspense>
                }
              />
            )
          )
        )}
      </Routes>
    </Suspense>
  )
}
