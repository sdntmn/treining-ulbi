// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

export const getArticleDetailsData = (state: StateSchema) => state.articleDetails?.data

export const getArticleDetailsIsLoading = (state: StateSchema) =>
  state.articleDetails?.isLoading || false

export const getArticleDetailsError = (state: StateSchema) => state.articleDetails?.error
