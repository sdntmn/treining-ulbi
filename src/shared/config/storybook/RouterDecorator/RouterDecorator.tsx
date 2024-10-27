import { StoryFn } from "@storybook/react"
import React from "react"
import { BrowserRouter } from "react-router-dom"

export const RouterDecorator = () => {
  function DecoratedStory(StoryComponent: StoryFn) {
    return (
      <BrowserRouter>
        <StoryComponent />
      </BrowserRouter>
    )
  }
  return DecoratedStory
}
