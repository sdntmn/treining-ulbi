import type { Meta, StoryObj } from "@storybook/react"

import { AvatarDropdown } from "./AvatarDropdown"

const meta = {
  title: "feature/AvatarDropdown",
  component: AvatarDropdown,
} satisfies Meta<typeof AvatarDropdown>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
