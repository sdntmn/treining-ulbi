import { Meta, StoryObj } from "@storybook/react/*"

import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"

import { EditableProfileCard } from "./EditableProfileCard"

const meta = {
  title: "feature/EditableProfileCard",
  component: EditableProfileCard,
} satisfies Meta<typeof EditableProfileCard>

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
  args: {
    id: "1",
  },
  decorators: [StoreDecorator(initialState), RouterDecorator()],
}
