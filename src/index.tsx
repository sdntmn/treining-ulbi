import { ErrorBoundary } from "app/providers/ErrorBoundary"
import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "shared/config/i18n/i18n"

import App from "./app/App"
import { ThemeProvider } from "./app/providers/ThemeProvider/ui/ThemeProvider"

import "app/styles/index.scss"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </BrowserRouter>
)
