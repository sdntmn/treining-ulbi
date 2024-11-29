import { Action, EnhancedStore, ReducersMapObject } from "@reduxjs/toolkit"
import { ArticlesPageSchema } from "pages/ArticlesPage"
// import { ScrollPageSchema } from "5_features/ScrollPage"
import { AxiosInstance } from "axios"
import { ArticleDetailsSchema } from "entities/Article"
import { ProfileSchema } from "entities/Profile"
import { UserSchema } from "entities/User"
import { AddCommentFormSchema } from "features/AddCommentForm"
import { LoginSchema } from "features/AuthByUserName/model/types/LoginSchema"
import { ArticleDetailsCommentsSchema } from "pages/ArticlesDetailsPage"
import { NavigateOptions, To } from "react-router-dom"

export interface StateSchema {
  user: UserSchema
  // scrollPage: ScrollPageSchema

  // // Асинхронные редюсеры
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleDetailsComments?: ArticleDetailsCommentsSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlesPageSchema
}

// type ReducedState = {
//   user: UserSchema
//   loginForm?: LoginSchema
//   profile?: ProfileSchema
// }

export type StateSchemaKey = keyof StateSchema
// export type MountedReducers = Record<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: Action) => StateSchema
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  add: (key: StateSchemaKey, reducer: any) => void
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
