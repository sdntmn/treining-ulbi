import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { routerConfig } from "shared/config/routerConfig/routerConfig"
import { PageLoader } from "widgets/PageLoader/PageLoader"

export const АррRouter = () => {
  return (
    <Routes>
      {Object.values(routerConfig).map(({ element, path }) => (
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
