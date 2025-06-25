/* eslint-disable paths-import/imports-layers */
/* eslint-disable import/order */
import { ReducersMapObject } from "@reduxjs/toolkit"
import { render } from "@testing-library/react"
import React, { ReactNode } from "react"
import { I18nextProvider } from "react-i18next"
import { MemoryRouter } from "react-router-dom"

import i18nForTests from "@/shared/config/i18n/i18nForTests"

// eslint-disable-next-line paths-import/imports-layers
import { Theme } from "@/shared/const/enums"

import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider"
import { ThemeProvider } from "@/app/providers/ThemeProvider"

export interface ComponentRenderOptions {
  route?: string
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
  theme?: Theme
}

interface TestProviderProps {
  children?: ReactNode
  options?: ComponentRenderOptions
}

export function TestProvider(props: TestProviderProps) {
  const { children, options = {} } = props
  const { route = "/", initialState, asyncReducers, theme = Theme.dark } = options
  console.log("test", i18nForTests.t("profileCardInputPlaceholderFirstName"))

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>{children}</div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}
// Функция для оберки компонентов с транслитерацией
export function ComponentRender(component: React.ReactNode, options: ComponentRenderOptions = {}) {
  return render(<TestProvider options={options}>{component} </TestProvider>)
}
