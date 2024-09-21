import type { Meta, StoryObj } from "@storybook/react"

import { Button, ButtonVar } from "./Button"

const meta: Meta<typeof Button> = {
  title: "shared/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: "Текст" },
}

export const Secondary: Story = {
  args: { children: "Текст", buttonVar: ButtonVar.CLEAR },
}

export const Outliny: Story = {
  args: { children: "Текст", buttonVar: ButtonVar.OUTLINE },
}
