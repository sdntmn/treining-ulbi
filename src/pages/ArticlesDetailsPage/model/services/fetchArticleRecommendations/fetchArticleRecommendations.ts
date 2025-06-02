import { createAsyncThunk } from "@reduxjs/toolkit"

import { Article } from "@/entities/Article"

// eslint-disable-next-line paths-import/imports-layers
import { ThunkConfig } from "@/app/providers/StoreProvider"

export const fetchArticleRecommendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  "articleDetailsPage/fetchArticleRecommendations",
  async (_props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
      const response = await extra.api.get<Article[]>("/articles", {
        params: {
          _limit: 4,
        },
      })

      if (!response.data) {
        throw new Error()
      }
      return response.data
    } catch (_e) {
      return rejectWithValue("error")
    }
  }
)
