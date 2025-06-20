import { createAsyncThunk } from "@reduxjs/toolkit"

import { Comment } from "@/entities/Comment"

// eslint-disable-next-line paths-import/imports-layers
import { ThunkConfig } from "@/app/providers/StoreProvider"

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>("articleDetailsPage/fetchCommentsByArticleId", async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi

  if (!articleId) {
    return rejectWithValue("error")
  }

  try {
    const response = await extra.api.get<Comment[]>("/comments", {
      params: {
        articleId,
        _expand: "user",
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
