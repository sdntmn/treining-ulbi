import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { loginByUsername } from "../services/LoginByUserName/loginByUserName"
import { LoginSchema } from "../types/LoginSchema"

const initialState: LoginSchema = {
  username: "",
  password: "",
  isLoading: false,
  error: undefined,
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = false
        state.error = undefined
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { actions: loginActions, reducer: loginReducer } = loginSlice
