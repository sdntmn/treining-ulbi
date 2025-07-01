import { createAsyncThunk } from "@reduxjs/toolkit"

import i18n from "@/shared/config/i18n/i18n"

// eslint-disable-next-line paths-import/imports-layers
import { ThunkConfig } from "@/app/providers/StoreProvider/configStore/StateSchema"

import { User, userActions } from "../../../../../entities/User"

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  "login/loginByUsername",
  async ({ username, password }: LoginByUsernameProps, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI
    try {
      const response = await extra.api.post<User>("/login", {
        username,
        password,
      })

      if (!response.data) {
        throw new Error()
      }

      // localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      dispatch(userActions.setAuthData(response.data))

      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(i18n.t("errorFormAuth"))
    }
  }
)
