import { createAsyncThunk } from "@reduxjs/toolkit"

import { addQueryParams } from "@/shared/lib/url/addQueryParams/addQueryParams"

import { Article, ArticleType } from "@/entities/Article"

// eslint-disable-next-line paths-import/imports-layers
import { ThunkConfig } from "@/app/providers/StoreProvider"

import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from "../../selectors/articlesPageSelectors"

interface FetchArticlesListProps {
  replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (_props, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi
  const limit = getArticlesPageLimit(getState())
  const sort = getArticlesPageSort(getState())
  const order = getArticlesPageOrder(getState())
  const search = getArticlesPageSearch(getState())
  const page = getArticlesPageNum(getState())
  const type = getArticlesPageType(getState())
  try {
    addQueryParams({
      sort,
      order,
      search,
      type,
    })
    const response = await extra.api.get<Article[]>("/articles", {
      params: {
        _expand: "user",
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
      },
    })

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (_e) {
    return rejectWithValue("error")
  }
})
