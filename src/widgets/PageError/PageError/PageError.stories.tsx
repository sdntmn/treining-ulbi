import type { Meta, StoryObj } from "@storybook/react"

import { PageError } from "./PageError"

const meta = {
  title: "widgets/PageError",
  component: PageError,
  globals: {
    position: "left",
  },
} satisfies Meta<typeof PageError>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
