import {
  Action,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit"
// import { ArticleDetailsCommentsSchema } from "3_pages/ArticlesDetailsPage"
// import { ArticlesPageSchema } from "3_pages/ArticlesPage"
// import { AddCommentFormSchema } from "5_features/AddCommentForm"
// import { ScrollPageSchema } from "5_features/ScrollPage"
import { AxiosInstance } from "axios"
// import { IArticleDetailsSchema } from "entities/Article"
import { ProfileSchema } from "entities/Profile"
import { UserSchema } from "entities/User"
import { LoginSchema } from "features/AuthByUserName/model/types/LoginSchema"
import { NavigateOptions, To } from "react-router-dom"

export interface StateSchema {
  user: UserSchema
  // scrollPage: ScrollPageSchema

  // // Асинхронные редюсеры
  loginForm?: LoginSchema
  profile?: ProfileSchema
  // articleDetails?: IArticleDetailsSchema
  // articleDetailsComments?: ArticleDetailsCommentsSchema
  // addCommentForm?: AddCommentFormSchema
  // articlesPage?: ArticlesPageSchema
}

type ReducedState = {
  user: UserSchema
  loginForm?: LoginSchema | undefined
  profile?: ProfileSchema | undefined
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = Record<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: Action) => ReducedState
  // add: (key: StateSchemaKey, reducer: Reducer) => void
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
  navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
