import { ReducersMapObject } from "@reduxjs/toolkit"
import { render } from "@testing-library/react"
import React, { ReactNode } from "react"
import { I18nextProvider } from "react-i18next"
import { MemoryRouter } from "react-router-dom"

import i18nForTests from "@/shared/config/i18n/i18nForTests"

// eslint-disable-next-line paths-import/imports-layers
import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider"

export interface ComponentRenderOptions {
  route?: string
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

interface TestProviderProps {
  children?: ReactNode
  options?: ComponentRenderOptions
}

export function TestProvider(props: TestProviderProps) {
  const { children, options = {} } = props
  const { route = "/", initialState, asyncReducers } = options

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>{children}</I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}
// Функция для оберки компонентов с транслитерацией
export function ComponentRender(component: React.ReactNode, options: ComponentRenderOptions = {}) {
  return render(<TestProvider options={options}>{component} </TestProvider>)
}
