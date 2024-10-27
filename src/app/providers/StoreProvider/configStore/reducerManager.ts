import {
  Action,
  Reducer,
  ReducersMapObject,
  combineReducers,
} from "@reduxjs/toolkit"

import {
  MountedReducers,
  ReducerManager,
  StateSchema,
  StateSchemaKey,
} from "./StateSchema"

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
  const reducers = { ...initialReducers }

  let combinedReducer = combineReducers(reducers)

  // Название редюсеров для удаления
  let keysToRemove: StateSchemaKey[] = []
  const mountReducers: MountedReducers = {
    user: false,
    loginForm: false,
  }

  return {
    getReducerMap: () => reducers,
    getMountedReducers: () => mountReducers,
    reduce: (state: StateSchema, action: Action): StateSchema => {
      if (keysToRemove.length > 0) {
        state = { ...state }
        keysToRemove.forEach((key: StateSchemaKey) => {
          delete state[key]
        })

        keysToRemove = []
      }

      return combinedReducer(state, action) as StateSchema
    },

    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || !(key in reducers)) {
        return
      }

      reducers[key] = reducer as Reducer
      mountReducers[key] = true
      combinedReducer = combineReducers(reducers)
    },

    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return
      }

      delete reducers[key]
      keysToRemove.push(key)

      mountReducers[key] = false
      combinedReducer = combineReducers(reducers)
    },
  }
}
