import { Flex } from "./Flex"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "shared/Flex",
  component: Flex,
} satisfies Meta<typeof Flex>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    direction: "row",
    children: (
      <>
        <div>1234</div>
        <div>1234</div>
        <div>1234</div>
        <div>1234</div>
      </>
    ),
  },
}
