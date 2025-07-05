import { Code } from "./Code"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Code> = {
  title: "shared/Code",
  component: Code,
} satisfies Meta<typeof Code>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
