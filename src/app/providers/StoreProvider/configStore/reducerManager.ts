// import {
//   AnyAction,
//   ReducersMapObject,
//   combineReducers,
// } from "@reduxjs/toolkit"

// import {
//   // ReducerManager,
//   StateSchema,
//   // MountedReducers,
//   StateSchemaKey,
// } from "./StateSchema"

// export function createReducerManager(
//   initialReducers: ReducersMapObject<StateSchema>
// ): ReducerManager {
//   const reducers = { ...initialReducers }

//   const combinedReducer = combineReducers(reducers)

//   // Название редюсеров для удаления
//   let keysToRemove: StateSchemaKey[] = []
//   // const mountReducers: MountedReducers = {}

//   return {
//     getReducerMap: () => reducers,
//     // getMountedReducers: () => mountReducers,
//     reduce: (state: StateSchema, action: AnyAction) => {
//       if (keysToRemove.length > 0) {
//         state = { ...state }
//         keysToRemove.forEach((key: StateSchemaKey) => {
//           delete state[key]
//         })

//         keysToRemove = []
//       }

//       return combinedReducer(state, action)
//     },

//     // add: (key: StateSchemaKey, reducer: Reducer) => {
//     //   if (!key || reducers[key]) {
//     //     return
//     //   }

//     //   reducers[key] = reducer
//     //   mountReducers[key] = true
//     //   combinedReducer = combineReducers(reducers)
//     // },

//     // remove: (key: StateSchemaKey) => {
//     //   if (!key || !reducers[key]) {
//     //     return
//     //   }

//     //   delete reducers[key]
//     //   keysToRemove.push(key)
//     //   mountReducers[key] = false
//     //   combinedReducer = combineReducers(reducers)
//     // },
//   }
// }
