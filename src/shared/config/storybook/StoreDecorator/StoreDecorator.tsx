import { StoryFn } from "@storybook/react"
import { StateSchema, StoreProvider } from "app/providers/StoreProvider"
import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice"
import { profileReducer } from "entities/Profile"
import { addCommentFormReducer } from "features/AddCommentForm/model/slice/addCommentFormSlice"
import { loginReducer } from "features/AuthByUserName"
// eslint-disable-next-line max-len
import { articleDetailsCommentsReducer } from "pages/ArticlesDetailsPage/model/slices/articleDetailsCommentsSlice"
import React from "react"

import { ReducersList } from "../../../lib/components/DynamicModuleLoader/DynamicModuleLoader"

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsComments: articleDetailsCommentsReducer,
}

type StoreDecorator = (
  initialState: DeepPartial<StateSchema>
) => (StoryComponent: StoryFn) => JSX.Element

export const StoreDecorator: StoreDecorator = (
  initialState: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList
) => {
  console.info(initialState)
  console.info(asyncReducers)
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
