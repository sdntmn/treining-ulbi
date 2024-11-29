import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage"

import { User, UserSchema } from "../types/user"

const initialState: UserSchema = {
  initializedUser: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, actions: PayloadAction<User>) => {
      state.authData = actions.payload
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (user) {
        state.authData = JSON.parse(user)
      }
      state.initializedUser = true
    },
    logOut: (state) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    },
  },
})

export const { actions: userActions, reducer: userReducer } = userSlice
