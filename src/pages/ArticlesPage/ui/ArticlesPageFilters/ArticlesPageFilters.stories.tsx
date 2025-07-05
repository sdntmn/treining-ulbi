import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"

import { ArticlesPageFilters } from "./ArticlesPageFilters"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ArticlesPageFilters> = {
  title: "pages/ArticlesPageFilters",
  component: ArticlesPageFilters,
} satisfies Meta<typeof ArticlesPageFilters>

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
  decorators: [StoreDecorator(initialState)],
}
