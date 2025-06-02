import { combineReducers, Reducer } from "@reduxjs/toolkit"

import { ArticleDetailsPageSchema } from "../types"

import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice"
import { articleDetailsPageRecommendationsReducer } from "./articleDetailsPageRecommendationsSlice"

export const articleDetailsPageReducer = combineReducers({
  recommendations: articleDetailsPageRecommendationsReducer as Reducer<
    ArticleDetailsPageSchema["recommendations"]
  >,
  comments: articleDetailsCommentsReducer as Reducer<ArticleDetailsPageSchema["comments"]>,
})
