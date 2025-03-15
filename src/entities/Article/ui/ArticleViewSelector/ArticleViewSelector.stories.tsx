import type { Meta, StoryObj } from "@storybook/react"

import { ArticleViewSelector } from "./ArticleViewSelector"

const meta: Meta<typeof ArticleViewSelector> = {
  title: "entities/ArticleViewSelector",
  component: ArticleViewSelector,
} satisfies Meta<typeof ArticleViewSelector>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
