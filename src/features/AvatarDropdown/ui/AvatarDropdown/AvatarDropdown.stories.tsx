import type { Meta, StoryObj } from "@storybook/react"

import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"

import { AvatarDropdown } from "./AvatarDropdown"

const meta = {
  title: "feature/AvatarDropdown",
  component: AvatarDropdown,
} satisfies Meta<typeof AvatarDropdown>

export default meta

type Story = StoryObj<typeof meta>

const initialState = {
  user: {
    authData: { id: "1" },
  },
}

export const Primary: Story = {
  args: {},
  decorators: [StoreDecorator(initialState), RouterDecorator()],
}
