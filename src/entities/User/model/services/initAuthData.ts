/* eslint-disable paths-import/imports-layers */

import { createAsyncThunk } from "@reduxjs/toolkit"

import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"

import { getUserDataByIdQuery } from "../../api/userApi"

import type { User } from "../types/user"
import type { ThunkConfig } from "@/app/providers/StoreProvider"

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
