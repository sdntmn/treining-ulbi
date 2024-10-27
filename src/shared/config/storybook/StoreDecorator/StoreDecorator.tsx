import { ReducersMapObject } from "@reduxjs/toolkit"
import { StoryFn } from "@storybook/react"
import { StateSchema, StoreProvider } from "app/providers/StoreProvider"
import { loginReducer } from "features/AuthByUserName"
import React from "react"

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer,
}

type StoreDecorator = (
  initialState: DeepPartial<StateSchema>
) => (StoryComponent: StoryFn) => JSX.Element

export const StoreDecorator: StoreDecorator = (
  initialState: DeepPartial<StateSchema>,
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
) => {
  const DecoratedStoryComponent = (StoryComponent: StoryFn) => (
    <StoreProvider
      initialState={initialState}
      asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
      <StoryComponent />
    </StoreProvider>
  )
  DecoratedStoryComponent.displayName = "StoreDecorator"
  return DecoratedStoryComponent
}
