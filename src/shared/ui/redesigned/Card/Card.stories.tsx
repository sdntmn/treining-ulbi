import { Text } from "../Text/Text"

import { Card } from "./Card"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "shared/Card",
  component: Card,
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: <Text title="test" text="text text" />,
  },
}
