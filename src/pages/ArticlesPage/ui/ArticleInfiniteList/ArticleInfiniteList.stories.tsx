import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"

import { ArticleInfiniteList } from "./ArticleInfiniteList"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ArticleInfiniteList> = {
  title: "pages/ArticleInfiniteList",

  component: ArticleInfiniteList,
} satisfies Meta<typeof ArticleInfiniteList>

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
