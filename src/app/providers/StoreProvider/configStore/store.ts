/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit"
// import { profileReducer } from "entities/Profile"
// import { loginReducer } from "features/AuthByUserName"

import { scrollSaveReducer } from "features/ScrollSave"

import { userReducer } from "../../../../entities/User"
// import { scrollPageReducer } from "5_features/ScrollPage"
import { $api } from "shared/api/api"

import { createReducerManager } from "./reducerManager"
import {
  // ReduxStoreWithManager,
  StateSchema,
  ThunkExtraArg,
} from "./StateSchema"

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  // Оставляем только обязательные редюсеры
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    scrollPage: scrollSaveReducer,
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArg = {
    api: $api,
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]
