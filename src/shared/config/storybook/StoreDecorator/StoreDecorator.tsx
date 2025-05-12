/* eslint-disable paths-import/imports-layers */
import { StoryFn } from "@storybook/react"
import React from "react"

import { articleDetailsReducer } from "@/entities/Article/testing"

import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider"

import { addCommentFormReducer } from "@/features/AddCommentForm/testing"
import { loginReducer } from "@/features/AuthByUserName/testing"
import { profileReducer } from "@/features/EditableProfileCard/testing"

import { articleDetailsPageReducer } from "@/pages/ArticlesDetailsPage/testing"

import { ReducersList } from "../../../lib/components/DynamicModuleLoader/DynamicModuleLoader"

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer,
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
