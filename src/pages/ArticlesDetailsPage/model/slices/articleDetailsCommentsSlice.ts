/* eslint-disable max-len */
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit"
import { StateSchema } from "app/providers/StoreProvider"
import { Comment } from "entities/Comment"

import { fetchCommentsByArticleId } from "../services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import { ArticleDetailsCommentsSchema } from "../types/ArticleDetailsCommentsSchema"

const commentsAdapter = createEntityAdapter<Comment, string>({
  selectId: (comment: Comment) => comment.id,
})

// Получаем селекторы для комментариев
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state: StateSchema) =>
    state.articleDetailsComments || commentsAdapter.getInitialState()
)

const articleDetailsCommentsSlice = createSlice({
  name: "articleDetailsCommentsSlice",
  initialState: {
    ...commentsAdapter.getInitialState(), // Используем spread для добавления дополнительных полей
    isLoading: false,
    error: undefined,
  } as ArticleDetailsCommentsSchema, // Указываем тип состояния
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchCommentsByArticleId.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.isLoading = false
          console.info("articleDetailsCommentsSlice", action.payload)
          // Передаем состояние и payload в setAll
          commentsAdapter.setAll(state, action.payload) // Передаем state как первый аргумент
          console.info(state)
        }
      )
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice
