import { StoryFn } from "@storybook/react"
import { ThemeProvider } from "app/providers/ThemeProvider"
import { Theme } from "app/providers/ThemeProvider/lib/theme/ThemeContext"

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
