import { Input } from "./Input"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Input> = {
  title: "shared/Input",
  component: Input,
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    placeholder: "Placeholder text",
    value: "1234",
  },
}
