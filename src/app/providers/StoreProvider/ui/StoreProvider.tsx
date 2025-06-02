import { ReducersMapObject } from "@reduxjs/toolkit"
import React, { ReactNode } from "react"
import { Provider } from "react-redux"

import { StateSchema } from "../configStore/StateSchema"
import { createReduxStore } from "../configStore/store"

interface StoreProviderProps {
  children?: ReactNode
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider: React.FC<StoreProviderProps> = (props: StoreProviderProps) => {
  const { children, initialState, asyncReducers } = props

  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>
  )

  return <Provider store={store}>{children}</Provider>
}
