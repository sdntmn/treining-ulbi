import type { Meta, StoryObj } from "@storybook/react"

import { fn } from "@storybook/test"

import { ArticleTypeTabs } from "./ArticleTypeTabs"
import { ArticleType } from "../../model/consts/consts"

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
