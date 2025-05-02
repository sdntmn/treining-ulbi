import type { Meta, StoryObj } from "@storybook/react"

import { ArticleDetailsPageHeader } from "./ArticleDetailsPageHeader"

const meta: Meta<typeof ArticleDetailsPageHeader> = {
  title: "page/ArticleDetailsPageHeader",
  component: ArticleDetailsPageHeader,
} satisfies Meta<typeof ArticleDetailsPageHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
