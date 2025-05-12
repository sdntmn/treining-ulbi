/* eslint-disable max-len */
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { Article } from "@/entities/Article"

// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

import { fetchArticleRecommendations } from "../services/fetchArticleRecommendations/fetchArticleRecommendations"
import { ArticleDetailsRecommendationsSchema } from "../types/ArticleDetailsRecommendationsSchema"

const recommendationsAdapter = createEntityAdapter<Article, string>({
  selectId: (article: Article) => article.id,
})

const initialState: ArticleDetailsRecommendationsSchema = {
  ...recommendationsAdapter.getInitialState(),
  isLoading: false,
  error: undefined,
}

export const getArticleRecommendations =
  recommendationsAdapter.getSelectors<StateSchema>(
    (state) =>
      state?.articleDetailsPage?.recommendations ??
      recommendationsAdapter.getInitialState()
  )

const articleDetailsPageRecommendationsSlice = createSlice({
  name: "articleDetailsPageRecommendations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
        state.isLoading = false
        recommendationsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? "Unknown error occurred"
      })
  },
})

export const { reducer: articleDetailsPageRecommendationsReducer } =
  articleDetailsPageRecommendationsSlice
