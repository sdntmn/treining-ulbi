import type { Meta, StoryObj } from "@storybook/react"

import { NotFoundPage } from "./NotFoundPage"

const meta = {
  title: "pages/NotFoundPage",
  component: NotFoundPage,
} satisfies Meta<typeof NotFoundPage>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
