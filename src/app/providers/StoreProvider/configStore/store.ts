import { configureStore } from "@reduxjs/toolkit"
// import { scrollPageReducer } from "5_features/ScrollPage"
// import { userReducer } from "entities/User"
// import { $api } from "shared/api/api"

// import { createReducerManager } from "./reducerManager"
import { StateSchema } from "./StateSchema"

export function createReduxStore(
  initialState?: StateSchema
  // asyncReducers?: ReducersMapObject<StateSchema>
) {
  // Оставляем только обязательные редюсеры
  // const rootReducers: ReducersMapObject = {
  //   // ...asyncReducers,
  //   // user: userReducer,
  //   // scrollPage: scrollPageReducer,
  // }

  // const reducerManager = createReducerManager(rootReducers)

  // const extraArg: ThunkExtraArg = {
  //   api: $api,
  // }

  const store = configureStore({
    // reducer: reducerManager.reduce as Reducer<StateSchema>,
    reducer: {},
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // thunk: {
        //   extraArgument: extraArg,
        // },
      }),
  })

  // store.reducerManager = reducerManager

  return store
}
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]
// export const useAppDispatch = () => useDispatch<AppDispatch>() перенесли в библиотеку
