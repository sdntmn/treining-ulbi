import type { Meta, StoryObj } from "@storybook/react"

import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"

import { ArticlesPageFilters } from "./ArticlesPageFilters"

const meta: Meta<typeof ArticlesPageFilters> = {
  title: "entities/ArticlesPageFilters",
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
