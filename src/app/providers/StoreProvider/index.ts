import type { StateSchema, ThunkConfig } from "./configStore/StateSchema"

import { AppDispatch, createReduxStore } from "./configStore/store"
import { StoreProvider } from "./ui/StoreProvider"

export {
  StoreProvider,
  StateSchema,
  createReduxStore,
  AppDispatch,
  ThunkConfig,
}
