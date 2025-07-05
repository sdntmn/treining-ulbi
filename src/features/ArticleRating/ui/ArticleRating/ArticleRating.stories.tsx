import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"

import ArticleRating from "./ArticleRating"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "feature/ArticleRating",
  component: ArticleRating,
} satisfies Meta<typeof ArticleRating>

export default meta

type Story = StoryObj<typeof meta>

const initialState = {
  user: {
    authData: { id: "39" },
  },
}

export const Primary: Story = {
  args: {
    articleId: "1",
  },
  decorators: [StoreDecorator(initialState), RouterDecorator()],
}
