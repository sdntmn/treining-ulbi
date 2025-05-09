import { Meta, StoryObj } from "@storybook/react"

import { NotificationItem } from "./NotificationItem"

const meta = {
  title: "shared/NotificationItem",

  component: NotificationItem,
} satisfies Meta<typeof NotificationItem>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    item: {
      id: "1",
      title: "title",
      description: "description",
      href: "https://google.com",
    },
  },
}
