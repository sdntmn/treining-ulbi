import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { AddCommentFormSchema } from "../types/addCommentForm"

const initialState: AddCommentFormSchema = {
  text: "",
  error: "",
}

export const addCommentFormSlice = createSlice({
  name: "addCommentForm",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginByUsername.pending, (state) => {
  //       state.error = undefined
  //       state.isLoading = true
  //     })
  //     // You can chain calls, or have separate `builder.addCase()` lines each time
  //     .addCase(loginByUsername.fulfilled, (state) => {
  //       state.isLoading = false
  //     })
  //     // You can match a range of action types
  //     .addCase(loginByUsername.rejected, (state, action) => {
  //       state.isLoading = false
  //       state.error = action.payload
  //     })
  // },
})

export const { actions: addCommentFormActions } = addCommentFormSlice
export const { reducer: addCommentFormReducer } = addCommentFormSlice
