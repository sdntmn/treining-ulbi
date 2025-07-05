import { ArticleViewSelector } from "./ArticleViewSelector"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ArticleViewSelector> = {
  title: "features/ArticleViewSelector",
  component: ArticleViewSelector,
} satisfies Meta<typeof ArticleViewSelector>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
