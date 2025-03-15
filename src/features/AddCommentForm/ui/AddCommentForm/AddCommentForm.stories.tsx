import type { Meta, StoryObj } from "@storybook/react"

import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator"

import AddCommentForm from "./AddCommentForm"

const meta: Meta<typeof AddCommentForm> = {
  title: "feature/AddCommentForm",
  component: AddCommentForm,
} satisfies Meta<typeof AddCommentForm>

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
