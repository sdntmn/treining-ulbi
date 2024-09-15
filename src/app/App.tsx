import { Suspense } from "react"
import { cn } from "shared/lib/helpers/classNames/classNames"
import { useTheme } from "shared/lib/hooks/useTheme/useTheme"
import { Navbar } from "widgets/Navbar"
import { Sidebar } from "widgets/SideBar"

import { АррRouter } from "./providers/router"
import "./styles/index.scss"

const App = () => {
  const { theme } = useTheme()

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
