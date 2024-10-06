// import {
//   AnyAction,
//   EnhancedStore,
//   // Reducer,
//   ReducersMapObject,
// } from "@reduxjs/toolkit"
// import { ArticleDetailsCommentsSchema } from "3_pages/ArticlesDetailsPage"
// import { ArticlesPageSchema } from "3_pages/ArticlesPage"
// import { AddCommentFormSchema } from "5_features/AddCommentForm"
// import { LoginSchema } from "5_features/AuthByUserName/model/types/LoginSchema"
// import { ScrollPageSchema } from "5_features/ScrollPage"
// import { AxiosInstance } from "axios"
// import { IArticleDetailsSchema } from "entities/Article"
// import { ProfileSchema } from "entities/Profile"
// import { UserSchema } from "entities/User"

export interface StateSchema {
  // user: UserSchema
  // scrollPage: ScrollPageSchema

  // // Асинхронные редюсеры
  // loginForm?: LoginSchema
  // profile?: ProfileSchema
  // articleDetails?: IArticleDetailsSchema
  // articleDetailsComments?: ArticleDetailsCommentsSchema
  // addCommentForm?: AddCommentFormSchema
  // articlesPage?: ArticlesPageSchema
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

// export interface ReducerManager {
//   // getReducerMap: () => ReducersMapObject<StateSchema>
//   // reduce: (state: StateSchema, action: AnyAction) => <StateSchema>
//   // // add: (key: StateSchemaKey, reducer: Reducer) => void
//   // // remove: (key: StateSchemaKey) => void
//   // // true - вмонтирован , false - нет монтирован
//   // getMountedReducers: () => MountedReducers
// }

// export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
//   reducerManager: ReducerManager
// }

// export interface ThunkExtraArg {
//   // api: AxiosInstance
// }

export interface ThunkConfig<T> {
  rejectValue: T
  // extra: ThunkExtraArg
  state: StateSchema
}
