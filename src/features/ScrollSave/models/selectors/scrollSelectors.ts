import { createSelector } from "@reduxjs/toolkit"

// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

import { ScrollSchema } from "../types/ScrollSave"

export const getSaveScroll = (state: StateSchema): ScrollSchema =>
  state.scrollPage.scroll || {}

export const getScrollByPath = createSelector(
  [getSaveScroll, (_: StateSchema, path: string) => path],
  (scroll: ScrollSchema, path) => scroll[path] || 0
)
