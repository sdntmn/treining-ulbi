import { createAsyncThunk } from "@reduxjs/toolkit"

import { SortOrder } from "@/shared/types/sort"

import { ArticleSortField, ArticleType } from "@/entities/Article"

// eslint-disable-next-line paths-import/imports-layers
import { ThunkConfig } from "@/app/providers/StoreProvider"

import { getArticlesPageInited } from "../../selectors/articlesPageSelectors"
import { articlesPageActions } from "../../slices/articlePageSlace"
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList"

type UrlParams = {
  order?: SortOrder
  sort?: ArticleSortField
  search?: string
  type?: ArticleType
}

export const sortOrders: SortOrder[] = ["asc", "desc"]

export const isSortOrder = (value: string): value is SortOrder => {
  return sortOrders.includes(value as SortOrder)
}

const urlParams = (params: URLSearchParams): UrlParams => {
  const order = params.get("order")
  const sort = params.get("sort")
  const search = params.get("search")
  const type = params.get("type")

  return {
    order: order && isSortOrder(order) ? order : undefined,
    sort: Object.values(ArticleSortField).includes(sort as ArticleSortField)
      ? (sort as ArticleSortField)
      : undefined,
    search: search || undefined,
    type: Object.values(ArticleType).includes(type as ArticleType)
      ? (type as ArticleType)
      : undefined,
  }
}

export const initArticlePage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  "articlesPage/initArticlePage",
  async (searchParams: URLSearchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi
    const inited = getArticlesPageInited(getState())

    if (!inited) {
      const { order, sort, search, type } = urlParams(searchParams)

      if (order) {
        dispatch(articlesPageActions.setOrder(order))
      }
      if (sort) {
        dispatch(articlesPageActions.setSort(sort))
      }
      if (search) {
        dispatch(articlesPageActions.setSearch(search))
      }

      if (type) {
        dispatch(articlesPageActions.setType(type))
      }

      dispatch(articlesPageActions.initState())
      dispatch(fetchArticlesList({}))
    }
  }
)
