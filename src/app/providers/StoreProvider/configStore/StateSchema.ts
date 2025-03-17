import { Action, EnhancedStore, ReducersMapObject } from "@reduxjs/toolkit"
import { AxiosInstance } from "axios"
import { ArticleDetailsSchema } from "entities/Article"
import { ProfileSchema } from "entities/Profile"
import { UserSchema } from "entities/User"
import { AddCommentFormSchema } from "features/AddCommentForm"
import { LoginSchema } from "features/AuthByUserName/model/types/LoginSchema"
import { ScrollPageSchema } from "features/ScrollSave"
import {
  ArticleDetailsCommentsSchema,
  ArticleDetailsRecommendationsSchema,
} from "pages/ArticlesDetailsPage"
import { ArticlesPageSchema } from "pages/ArticlesPage"

export interface StateSchema {
  user: UserSchema
  scrollPage: ScrollPageSchema

  // Асинхронные редюсеры
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlesPageSchema
  articleDetailsComments?: ArticleDetailsCommentsSchema
  articleDetailsRecomendation?: ArticleDetailsRecommendationsSchema
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

export interface ThunkConfig<T, Arg = void> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
  meta: {
    arg: Arg
    requestId: string
    requestStatus: "pending" | "fulfilled" | "rejected"
  }
}

// export interface ThunkConfig<
//   RejectValue = unknown,
//   Arg = void,
//   State = StateSchema,
// > {
//   state: State
//   extra: ThunkExtraArg
//   rejectValue: RejectValue
//   meta: {
//     arg: Arg
//     requestId: string
//     requestStatus: "pending" | "fulfilled" | "rejected"
//   }
// }
