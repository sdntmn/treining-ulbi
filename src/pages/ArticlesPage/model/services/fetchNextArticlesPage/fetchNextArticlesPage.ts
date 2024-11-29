import { createAsyncThunk } from "@reduxjs/toolkit"
import { IThunkConfig } from "1_app/providers/StoreProvider"
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from "../../selectors/articlesPageSelectors"

import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList"
import { articlesPageActions } from "../../slices/articlePageSlace"

export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  IThunkConfig<string>
>("articlesPage/fetchNextArticlesPage", async (_, thunkApi) => {
  const { getState, dispatch } = thunkApi
  const hasMore = getArticlesPageHasMore(getState())
  const page = getArticlesPageNum(getState())
  const isLoading = getArticlesPageIsLoading(getState())

  if (hasMore && !isLoading && page) {
    dispatch(articlesPageActions.setPage(page + 1))
    dispatch(
      fetchArticlesList({
        page: page + 1,
      })
    )
  }
})
