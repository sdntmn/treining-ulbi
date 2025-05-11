import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"

import { User, UserSchema } from "../types/user"

const initialState: UserSchema = {
  initializedUser: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
      localStorage.setItem(
        USER_LOCALSTORAGE_KEY,
        JSON.stringify(action.payload)
      )
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (user) {
        try {
          state.authData = JSON.parse(user)
        } catch (e) {
          console.error("Failed to parse user data from localStorage", e)
        }
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
