/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit"

import { scrollSaveReducer } from "@/features/ScrollSave"
import { $api } from "@/shared/api/api"
import { rtkApi } from "@/shared/api/rtkApi"

import { createReducerManager } from "./reducerManager"
import { StateSchema, ThunkExtraArg } from "./StateSchema"
import { userReducer } from "../../../../entities/User"

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  // Оставляем только обязательные редюсеры
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    scrollPage: scrollSaveReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
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
      }).concat(rtkApi.middleware),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]
