import { Meta, StoryObj } from "@storybook/react"

import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"

import { NotificationList } from "./NotificationList"

const meta = {
  title: "entities/NotificationList",

  component: NotificationList,
} satisfies Meta<typeof NotificationList>

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
