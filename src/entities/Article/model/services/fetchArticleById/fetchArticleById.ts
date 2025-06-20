import { createAsyncThunk } from "@reduxjs/toolkit"

// eslint-disable-next-line paths-import/imports-layers
import { ThunkConfig } from "@/app/providers/StoreProvider"

import { Article } from "../../types/article"

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
  "articleDetails/fetchArticleById",
  async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi
    try {
      const response = await extra.api.get<Article>(`/articles/${articleId}`, {
        params: {
          _expand: "user",
        },
      })

      if (!response.data) {
        throw new Error()
      }

      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue("error")
    }
  }
)
