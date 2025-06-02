/* eslint-disable max-len */
import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { Comment } from "@/entities/Comment"

// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

import { fetchCommentsByArticleId } from "../services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import { ArticleDetailsCommentsSchema } from "../types/ArticleDetailsCommentsSchema"

const commentsAdapter = createEntityAdapter<Comment, string>({
  selectId: (comment: Comment) => comment.id,
})

// Получаем селекторы для комментариев
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state: StateSchema) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState()
)

const articleDetailsCommentsSlice = createSlice({
  name: "articleDetailsCommentsSlice",
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.isLoading = false
        commentsAdapter.setAll(state, action.payload) // Передаем state как первый аргумент
      })
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice
