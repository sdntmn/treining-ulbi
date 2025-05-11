import type { Meta, StoryObj } from "@storybook/react"

import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"

import { Navbar } from "./Navbar"

const meta = {
  title: "widgets/Navbar",
  component: Navbar,
  globals: {
    position: "left",
  },
} satisfies Meta<typeof Navbar>

export default meta

type Story = StoryObj<typeof meta>

const initialState = {
  loginForm: {
    username: "admin",
    password: "123",
    isLoading: false,
  },
}

const initialStateAuth = {
  user: {
    authData: {
      id: "",
      username: "",
      avatar: "",
    },
  },
}

export const Primary: Story = {
  decorators: [StoreDecorator(initialState), RouterDecorator()],
}

export const Auth: Story = {
  decorators: [StoreDecorator(initialStateAuth), RouterDecorator()],
}
