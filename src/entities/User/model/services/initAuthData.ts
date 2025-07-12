/* eslint-disable import/order */
/* eslint-disable paths-import/imports-layers */

import { createAsyncThunk } from "@reduxjs/toolkit"

import { LOCAL_STORAGE_LAST_THEME_KEY, USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"

import { getUserDataByIdQuery } from "../../api/userApi"

import type { ThunkConfig } from "@/app/providers/StoreProvider"
import type { User } from "../types/user"

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  "user/initAuthData",
  async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi

    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY)

    if (!userId) {
      return rejectWithValue("")
    }

    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap()

      localStorage.setItem(
        LOCAL_STORAGE_LAST_THEME_KEY,
        response.features?.isAppRedesigned ? "new" : "old"
      )

      if (!response.jsonSettings) {
        return rejectWithValue("")
      }

      return response
    } catch (e) {
      console.log(e)
      return rejectWithValue("")
    }
  }
)
