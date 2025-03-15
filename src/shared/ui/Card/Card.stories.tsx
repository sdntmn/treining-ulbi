import type { Meta, StoryObj } from "@storybook/react"

import React from "react"

import { TextParagraf } from "../TextParagraf/TextParagraf"
import { Card } from "./Card"

const meta = {
  title: "shared/Card",
  component: Card,
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: <TextParagraf title="test" text="text text" />,
  },
}
