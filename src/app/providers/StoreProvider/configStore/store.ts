/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureStore, ReducersMapObject } from "@reduxjs/toolkit"
import { userReducer } from "entities/User"
import { loginReducer } from "features/AuthByUserName"
import { useDispatch } from "react-redux"
// import { scrollPageReducer } from "5_features/ScrollPage"
import { $api } from "shared/api/api"

import { createReducerManager } from "./reducerManager"
import {
  ReduxStoreWithManager,
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
    loginForm: loginReducer,
    // scrollPage: scrollPageReducer,
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArg = {
    api: $api,
  }

  const store = configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  })
  configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  }) as ReduxStoreWithManager

  // @ts-expect-error
  store.reducerManager = reducerManager

  return store
}
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]
export const useAppDispatch = () => useDispatch<AppDispatch>()
