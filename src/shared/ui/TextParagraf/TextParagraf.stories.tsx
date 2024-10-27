import type { Meta, StoryObj } from "@storybook/react"

import { TextParagraf } from "./TextParagraf"

const meta: Meta<typeof TextParagraf> = {
  title: "shared/TextParagraf",
  component: TextParagraf,
} satisfies Meta<typeof TextParagraf>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: "Заголовок",
    text: "Текст",
  },
}

export const OnlyTitle: Story = {
  args: {
    title: "Заголовок",
  },
}

export const OnlyText: Story = {
  args: {
    text: "Текст",
  },
}
