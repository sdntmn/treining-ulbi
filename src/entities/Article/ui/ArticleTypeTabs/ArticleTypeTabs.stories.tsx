import type { Meta, StoryObj } from "@storybook/react"

import { fn } from "@storybook/test"
import { ArticleType } from "entities/Article"

import { ArticleTypeTabs } from "./ArticleTypeTabs"

const meta = {
  title: "entities/ArticleTypeTabs",
  component: ArticleTypeTabs,
  args: {
    onChangeType: fn(), // Используем fn() для мокирования действий
  },
} satisfies Meta<typeof ArticleTypeTabs>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    value: ArticleType.ECONOMICS,
    onChangeType: fn(),
  },
}
