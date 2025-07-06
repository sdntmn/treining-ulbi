import { TextAlign, TextParagraf, TextSize } from "./TextParagraf"

import type { Meta, StoryObj } from "@storybook/react"

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

export const TextAlignCenter: Story = {
  args: {
    title: "Заголовок",
    size: TextSize.S,
    text: "Текст",
    align: TextAlign.CENTER,
  },
}

export const SizyTitleS: Story = {
  args: {
    title: "Заголовок",
    size: TextSize.S,
    text: "Текст",
  },
}

export const SizyTitleM: Story = {
  args: {
    title: "Заголовок",
    size: TextSize.M,
    text: "Текст",
  },
}

export const SizyTitleL: Story = {
  args: {
    title: "Заголовок",
    size: TextSize.L,
    text: "Текст",
  },
}
