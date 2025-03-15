import type { Meta, StoryObj } from "@storybook/react"

import ArticlesPage from "./ArticlesPage"

const meta = {
  title: "pages/ArticlesPage",
  component: ArticlesPage,
} satisfies Meta<typeof ArticlesPage>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
