import { Button, ButtonFontSize } from "./Button"

import type { Meta, StoryObj } from "@storybook/react"

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
  args: { children: "Текст", variant: "clear" },
}

export const Disabled: Story = {
  args: {
    children: "Текст",
    variant: "praymary",
    fontSize: ButtonFontSize.FONT_L,
    disabled: true,
  },
}

export const Outliny: Story = {
  args: { children: "Текст", variant: "outline" },
}

export const Background: Story = {
  args: { children: "Текст", variant: "praymary" },
}

export const Size: Story = {
  args: { children: "Текст", variant: "praymary", size: "l" },
}

export const FontSize: Story = {
  args: {
    children: "Текст",
    variant: "praymary",
    fontSize: ButtonFontSize.FONT_L,
  },
}
