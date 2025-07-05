import { fn } from "@storybook/test"

import { ListBox } from "./ListBox"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "shared/ListBox",
  component: ListBox,
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof ListBox>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    items: [
      { value: "first", content: "Option 1" },
      { value: "second", content: "Option 2" },
      { value: "third", content: "Option 3" },
    ],
    value: "first",
  },
}
