import type { Meta, StoryObj } from "@storybook/react"

// import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator"

import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator"

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
  decorators: [StoreDecorator(initialState)],
}

export const Auth: Story = {
  decorators: [StoreDecorator(initialStateAuth)],
}
