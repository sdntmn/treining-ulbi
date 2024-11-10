import { StoryFn } from "@storybook/react"
import { StateSchema, StoreProvider } from "app/providers/StoreProvider"
import { profileReducer } from "entities/Profile"
import { loginReducer } from "features/AuthByUserName"
import React from "react"
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
}

type StoreDecorator = (
  initialState: DeepPartial<StateSchema>
) => (StoryComponent: StoryFn) => JSX.Element

export const StoreDecorator: StoreDecorator = (
  initialState: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList
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
