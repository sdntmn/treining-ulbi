import type { Meta, StoryObj } from "@storybook/react"

import React, { useState } from "react"

import { ListBox } from "./ListBox"

const meta = {
  title: "shared/ListBox",
  component: ListBox,
} satisfies Meta<typeof ListBox>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: "Label",
    items: [
      { value: "1", content: "Option 1" },
      { value: "2", content: "Option 2" },
      { value: "3", content: "Option 3" },
    ],
    onChange: (value: string) => console.log("Selected:", value),
  },
}

export const WithState: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string>("1")

    return (
      <ListBox
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
          console.log("Selected:", newValue)
        }}
      />
    )
  },
  args: {
    label: "Label with state",
    items: [
      { value: "1", content: "Option 1" },
      { value: "2", content: "Option 2" },
      { value: "3", content: "Option 3" },
    ],
    onChange: () => {},
  },
}
