import { ThemeSwitcher } from "./ThemeSwitcher"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "widgets/ThemeSwitcher",
  component: ThemeSwitcher,
} satisfies Meta<typeof ThemeSwitcher>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
