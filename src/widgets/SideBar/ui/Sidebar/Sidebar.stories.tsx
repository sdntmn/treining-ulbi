import type { Meta, StoryObj } from "@storybook/react"

import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator"

import { Sidebar } from "./Sidebar"

const meta: Meta<typeof Sidebar> = {
  title: "widgets/Sidebar",
  component: Sidebar,
  globals: {
    position: "left",
  },
  decorators: [RouterDecorator()],
} satisfies Meta<typeof Sidebar>

export default meta

const initialState = {
  loginForm: {
    username: "admin",
    password: "123",
    isLoading: false,
  },
}

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
  decorators: [StoreDecorator(initialState)],
}
