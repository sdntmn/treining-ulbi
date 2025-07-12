import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { ErrorBoundary } from "@/app/providers/ErrorBoundary"
import { StoreProvider } from "@/app/providers/StoreProvider"
import "@/shared/config/i18n/i18n"

import App from "./app/App"
import { ThemeProvider } from "./app/providers/ThemeProvider/ui/ThemeProvider"
import { ForceUpdateProvider } from "./shared/lib/render/forceUpdate"

import "@/app/styles/index.scss"

const container = document.getElementById("root")

const root = createRoot(container ?? document.body)
root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ForceUpdateProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ForceUpdateProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>
)
