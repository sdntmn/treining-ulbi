import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"
import { SortOrder } from "@/shared/types/sort"

import { Article, ArticleViewType, ArticleSortField, ArticleType } from "@/entities/Article"

// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList"
import { ArticlesPageSchema } from "../types/articlePageSchema"

const articlesAdapter = createEntityAdapter<Article, string>({
  selectId: (article) => article.id,
})

const baseInitialState = articlesAdapter.getInitialState<ArticlesPageSchema>({
  isLoading: false,
  ids: [],
  error: undefined,
  entities: {},
  view: ArticleViewType.CARD,
  page: 1,
  hasMore: true,
  limit: 9,
  order: "asc",
  sort: ArticleSortField.CREATED,
  search: "",
  _inited: false,
  type: ArticleType.ALL,
})

const initialState = articlesAdapter.getInitialState(baseInitialState)

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage ?? initialState
)

const articlesPageSlice = createSlice({
  name: "articlesPageSlice",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ArticleViewType>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },

    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload
    },

    initState: (state) => {
      const view =
        (localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleViewType) ||
        ArticleViewType.CARD

      state.view = view
      state.limit = view === ArticleViewType.LIST ? 4 : 9
      state._inited = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false
        // if (state.page === 1) {
        //   articlesAdapter.setAll(state, action.payload)
        // } else {
        //   articlesAdapter.addMany(state, action.payload)
        // }
        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload)
        } else {
          articlesAdapter.addMany(state, action.payload)
        }
        state.hasMore = action.payload.length >= (state.limit || 9)
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { reducer: articlesPageReducer, actions: articlesPageActions } = articlesPageSlice
