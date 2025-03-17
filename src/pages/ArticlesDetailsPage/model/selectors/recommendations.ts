import { StateSchema } from "app/providers/StoreProvider"

export const getArticleRecommendationsIsLoading = (state: StateSchema) => {
  return state.articleDetailsRecomendation?.isLoading
}

export const getArticleRecommendationsError = (state: StateSchema) => {
  return state.articleDetailsRecomendation?.error
}
