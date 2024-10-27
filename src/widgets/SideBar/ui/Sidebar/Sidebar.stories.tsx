import type { Meta, StoryObj } from "@storybook/react"

import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator"

import { Sidebar } from "./Sidebar"

const meta: Meta<typeof Sidebar> = {
  title: "widgets/Sidebar",
  component: Sidebar,
  globals: {
    position: "left",
  },
  decorators: [RouterDecorator()],
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
