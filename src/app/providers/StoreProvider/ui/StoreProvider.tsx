import { ReducersMapObject } from "@reduxjs/toolkit"
import React, { ReactNode } from "react"
import { Provider } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"

import { StateSchema } from "../../StoreProvider"
import { createReduxStore } from "../configStore/store"

interface StoreProviderProps {
  children?: ReactNode
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: ReducersList
}

export const StoreProvider: React.FC<StoreProviderProps> = (
  props: StoreProviderProps
) => {
  const { children, initialState, asyncReducers } = props

  const navigate = useNavigate() //  порождает баги

  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
    navigate
  )

  return <Provider store={store}>{children}</Provider>
}
