import { Text } from "./Text"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Text> = {
  title: "shared/Text",
  component: Text,
} satisfies Meta<typeof Text>

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
    size: "m",
    text: "Текст",
    align: "center",
  },
}

export const SizyTitleS: Story = {
  args: {
    title: "Заголовок",
    size: "s",
    text: "Текст",
  },
}

export const SizyTitleM: Story = {
  args: {
    title: "Заголовок",
    size: "m",
    text: "Текст",
  },
}

export const SizyTitleL: Story = {
  args: {
    title: "Заголовок",
    size: "l",
    text: "Текст",
  },
}
