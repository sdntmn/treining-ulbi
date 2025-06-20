import { createAsyncThunk } from "@reduxjs/toolkit"

// eslint-disable-next-line paths-import/imports-layers
import { ThunkConfig } from "@/app/providers/StoreProvider"

import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from "../../selectors/articlesPageSelectors"
import { articlesPageActions } from "../../slices/articlePageSlace"
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList"

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  "articlesPage/fetchNextArticlesPage",
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi

    const hasMore = getArticlesPageHasMore(getState())

    const page = getArticlesPageNum(getState())

    const isLoading = getArticlesPageIsLoading(getState())

    if (hasMore && !isLoading && page) {
      dispatch(articlesPageActions.setPage(page + 1))
      dispatch(fetchArticlesList({}))
    }
  }
)
