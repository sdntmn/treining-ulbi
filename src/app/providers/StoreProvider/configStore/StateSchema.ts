import { Action, EnhancedStore, ReducersMapObject } from "@reduxjs/toolkit"
import { AxiosInstance } from "axios"

import { rtkApi } from "@/shared/api/rtkApi"

import { ArticleDetailsSchema } from "@/entities/Article"
import { UserSchema } from "@/entities/User"

import { AddCommentFormSchema } from "@/features/AddCommentForm"
import { LoginSchema } from "@/features/AuthByUserName"
import { ProfileSchema } from "@/features/EditableProfileCard"
import { ScrollPageSchema } from "@/features/ScrollSave"

import { ArticleDetailsPageSchema } from "@/pages/ArticlesDetailsPage"
import { ArticlesPageSchema } from "@/pages/ArticlesPage"

export interface StateSchema {
  user: UserSchema
  scrollPage: ScrollPageSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  // Асинхронные редюсеры
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlesPageSchema
  articleDetailsPage?: ArticleDetailsPageSchema
}

export type StateSchemaKey = keyof StateSchema

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
}

type RequestStatus = "pending" | "fulfilled" | "rejected"

export interface ThunkConfig<T, Arg = void> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
  meta: {
    arg: Arg
    requestId: string
    requestStatus: RequestStatus
  }
}
