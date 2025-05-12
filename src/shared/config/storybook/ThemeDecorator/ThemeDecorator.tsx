import { StoryFn } from "@storybook/react"

import { Theme } from "@/shared/const/enums"

// eslint-disable-next-line paths-import/imports-layers
import { ThemeProvider } from "@/app/providers/ThemeProvider"

export const ThemeDecorator = (theme: Theme) => {
  function DecoratedStory(StoryComponent: StoryFn) {
    return (
      <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
          <StoryComponent />
        </div>
      </ThemeProvider>
    )
  }
  return DecoratedStory
}
