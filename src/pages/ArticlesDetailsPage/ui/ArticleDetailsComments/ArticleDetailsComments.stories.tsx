import type { Meta, StoryObj } from "@storybook/react"

import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"

import { ArticleDetailsComments } from "./ArticleDetailsComments"

const meta: Meta<typeof ArticleDetailsComments> = {
  title: "pages/ArticleDetailsComments",
  component: ArticleDetailsComments,
} satisfies Meta<typeof ArticleDetailsComments>

export default meta

type Story = StoryObj<typeof meta>

const initialState = {
  loginForm: {
    username: "admin",
    password: "123",
    isLoading: false,
  },
}

export const Primary: Story = {
  args: {},
  decorators: [StoreDecorator(initialState), RouterDecorator()],
}
