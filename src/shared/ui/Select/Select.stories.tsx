import type { Meta, StoryObj } from "@storybook/react"

import { Select } from "./Select"

const meta = {
  title: "shared/Select",
  component: Select,
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: "Label",
    options: [
      { value: "1", content: "Option 1" },
      { value: "2", content: "Option 2" },
      { value: "3", content: "Option 3" },
    ],
  },
}
