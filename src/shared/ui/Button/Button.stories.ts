import type { Meta, StoryObj } from "@storybook/react"

import { Button, ButtonFontSize, ButtonSize, ButtonVar } from "./Button"

const meta: Meta<typeof Button> = {
  title: "shared/Button",
  component: Button,
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

export const Background: Story = {
  args: { children: "Текст", buttonVar: ButtonVar.PRIMARY },
}

export const Size: Story = {
  args: { children: "Текст", buttonVar: ButtonVar.PRIMARY, size: ButtonSize.L },
}

export const FontSize: Story = {
  args: {
    children: "Текст",
    buttonVar: ButtonVar.PRIMARY,
    fontSize: ButtonFontSize.FONT_L,
  },
}
