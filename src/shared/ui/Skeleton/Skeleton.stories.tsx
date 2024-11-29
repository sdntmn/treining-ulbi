import type { Meta, StoryObj } from "@storybook/react"

import { Skeleton } from "./Skeleton"

const meta = {
  title: "shared/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    height: 100,
    width: "100%",
  },
}

export const Circle: Story = {
  args: {
    border: "50%",
    height: 100,
    width: 100,
  },
}
