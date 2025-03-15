import type { Meta, StoryObj } from "@storybook/react"

import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator"

import LoginForm from "./LoginForm"

const meta: Meta<typeof LoginForm> = {
  title: "feature/LoginForm",
  component: LoginForm,
} satisfies Meta<typeof LoginForm>

export default meta

type Story = StoryObj<typeof meta>

const initialState = {
  loginForm: {
    username: "admin",
    password: "123",
    isLoading: false,
  },
}

const initialStateLoading = {
  loginForm: {
    username: "admin",
    password: "123",
    isLoading: true,
  },
}

const initialStateError = {
  loginForm: {
    username: "admin",
    password: "123",
    error: "Что то пошло не так",
  },
}

export const Primary: Story = {
  args: {},
  decorators: [StoreDecorator(initialState), RouterDecorator()],
}

export const LoginFormError: Story = {
  args: {},
  decorators: [StoreDecorator(initialStateError), RouterDecorator()],
}

export const LoginFormLoading: Story = {
  args: {},
  decorators: [StoreDecorator(initialStateLoading), RouterDecorator()],
}
