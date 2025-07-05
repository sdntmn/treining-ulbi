import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"
import { setFeatureFlags } from "@/shared/lib/features"

import { initAuthData } from "../services/initAuthData"
import { saveJsonSettings } from "../services/saveJsonSettings"
import { JsonSettings } from "../types/jsonSettings"
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
      setFeatureFlags(action.payload.features)
      localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id)
    },
    // initAuthData: (state) => {
    //   const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
    //   if (user) {
    //     const userObj = JSON.parse(user) as User
    //     try {
    //       state.authData = userObj
    //       setFeatureFlags(userObj?.features || {})
    //     } catch (e) {
    //       console.error("Failed to parse user data from localStorage", e)
    //     }
    //   }
    //   state.initializedUser = true
    // },
    logOut: (state) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, { payload }: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = payload
        }
      }
    )
    builder.addCase(initAuthData.fulfilled, (state, { payload }: PayloadAction<User>) => {
      state.authData = payload
      setFeatureFlags(payload.features)
      state.initializedUser = true
    })
    builder.addCase(initAuthData.rejected, (state) => {
      state.initializedUser = true
    })
  },
})

export const { actions: userActions, reducer: userReducer } = userSlice
