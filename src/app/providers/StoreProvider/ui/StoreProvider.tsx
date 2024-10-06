// import { ReducersMapObject } from "@reduxjs/toolkit"
import { ReactNode } from "react"
import { Provider } from "react-redux"

import { StateSchema } from "../configStore/StateSchema"
import { createReduxStore } from "../configStore/store"

interface StoreProviderProps {
  children?: ReactNode
  initialState?: DeepPartial<StateSchema>
  // asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState } = props

  // const navigate = useNavigate() //  порождает баги

  const store = createReduxStore(
    initialState as StateSchema
    // asyncReducers as ReducersMapObject<StateSchema>
    // navigate
  )

  return <Provider store={store}>{children}</Provider>
}
