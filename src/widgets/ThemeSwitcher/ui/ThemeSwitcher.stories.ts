import type { Meta, StoryObj } from "@storybook/react"

import { ThemeSwitcher } from "./ThemeSwitcher"

const meta = {
  title: "widgets/ThemeSwitcher",
  component: ThemeSwitcher,
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeSwitcher>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
