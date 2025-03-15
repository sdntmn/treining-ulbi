import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { ScrollPageSchema } from "../types/ScrollSave"

const initialState: ScrollPageSchema = {
  scroll: {},
}

export const scrollSaveSlice = createSlice({
  name: "scrollSaveSlace",
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      { payload }: PayloadAction<{ path: string; position: number }>
    ) => {
      state.scroll[payload.path] = payload.position
    },
  },
})

export const { actions: scrollSaveActions, reducer: scrollSaveReducer } =
  scrollSaveSlice
