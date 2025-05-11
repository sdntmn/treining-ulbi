import type { Meta, StoryObj } from "@storybook/react"

import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator"

import ArticleRating from "./ArticleRating"

const meta = {
  title: "feature/ArticleRating",
  component: ArticleRating,
} satisfies Meta<typeof ArticleRating>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    articleId: "1",
  },
  decorators: [RouterDecorator()],
}
