import { ButtonNotification } from "./ButtonNotification"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "feature/ButtonNotification",

  component: ButtonNotification,
} satisfies Meta<typeof ButtonNotification>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
