import type { Meta, StoryObj } from "@storybook/react"

/* eslint-disable i18next/no-literal-string */
import React from "react"

import { Popover } from "./Popover"

const meta = {
  title: "shared/Popover",

  component: Popover,
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    direction: "bottom right",
    trigger: "Click",
    children: <span>hello</span>,
  },
}
