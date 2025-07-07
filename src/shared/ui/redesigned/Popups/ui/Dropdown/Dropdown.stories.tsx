import { Dropdown } from "./Dropdown"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "shared/Dropdown",

  component: Dropdown,
} satisfies Meta<typeof Dropdown>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    items: [{ content: "Option 1" }, { content: "Option 2" }, { content: "Option 3" }],
    trigger: "Click",
  },
}
