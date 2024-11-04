/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureStore, ReducersMapObject } from "@reduxjs/toolkit"
// import { profileReducer } from "entities/Profile"
// import { loginReducer } from "features/AuthByUserName"
import { useDispatch } from "react-redux"
import { NavigateOptions, To } from "react-router-dom"

import { userReducer } from "../../../../entities/User"
// import { scrollPageReducer } from "5_features/ScrollPage"
import { $api } from "shared/api/api"

import { createReducerManager } from "./reducerManager"
import {
  ReducerManager,
  ReduxStoreWithManager,
  // ReduxStoreWithManager,
  StateSchema,
  ThunkExtraArg,
} from "./StateSchema"

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void
) {
  // Оставляем только обязательные редюсеры
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    // scrollPage: scrollPageReducer,
  }

  const reducerManager: ReducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArg = {
    api: $api,
    navigate,
  }

  // const store = configureStore<StateSchema>({
  //   reducer: rootReducers,
  //   devTools: __IS_DEV__,
  //   preloadedState: initialState,
  // })
  // configureStore({
  //   reducer: reducerManager.reduce as unknown as ReducersMapObject<StateSchema>,
  //   devTools: __IS_DEV__,
  //   preloadedState: initialState,
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //       thunk: {
  //         extraArgument: extraArg,
  //       },
  //     }),
  // }) as ReduxStoreWithManager

  //   const store = configureStore<StateSchema>({
  //   reducer: rootReducers,
  //   devTools: __IS_DEV__,
  //   preloadedState: initialState,
  // })

  const store = configureStore({
    reducer: reducerManager.reduce as unknown as ReducersMapObject<StateSchema>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  }) as ReduxStoreWithManager

  store.reducerManager = reducerManager

  return store
}
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]
export const useAppDispatch = () => useDispatch<AppDispatch>()
